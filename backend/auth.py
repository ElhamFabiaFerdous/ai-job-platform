from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserRegister, UserLogin, TokenResponse, UserResponse
from app.utils.auth_utils import hash_password, verify_password, create_access_token

router = APIRouter()

@router.post("/register", response_model=TokenResponse, status_code=201)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    """
    নতুন ইউজার রেজিস্ট্রেশন
    - ইমেইল আগে থেকে আছে কিনা চেক করে
    - পাসওয়ার্ড bcrypt দিয়ে হ্যাশ করে DB তে সেভ করে
    - JWT Token রিটার্ন করে
    """
    # ইমেইল আগে থেকে আছে কিনা চেক
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট আছে!"
        )

    # নতুন ইউজার তৈরি
    new_user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        password_hash=hash_password(user_data.password),
        career_goal=user_data.career_goal
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Token তৈরি করে রিটার্ন
    token = create_access_token({"sub": str(new_user.id)})
    return TokenResponse(access_token=token, user=UserResponse.from_orm(new_user))


@router.post("/login", response_model=TokenResponse)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """
    ইউজার লগইন
    - ইমেইল ও পাসওয়ার্ড যাচাই করে
    - সঠিক হলে JWT Token রিটার্ন করে
    """
    user = db.query(User).filter(User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ইমেইল বা পাসওয়ার্ড ভুল!"
        )

    token = create_access_token({"sub": str(user.id)})
    return TokenResponse(access_token=token, user=UserResponse.from_orm(user))


@router.get("/me", response_model=UserResponse)
def get_me(db: Session = Depends(get_db), token: str = Depends(lambda: None)):
    """বর্তমান লগইন করা ইউজারের তথ্য দেখাবে"""
    from app.utils.auth_utils import get_current_user
    # এটা protected route — token লাগবে
    pass
