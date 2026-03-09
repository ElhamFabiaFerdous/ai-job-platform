from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserProfileUpdate, UserResponse
from app.utils.auth_utils import get_current_user

router = APIRouter()

@router.get("/", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    """
    লগইন করা ইউজারের প্রোফাইল দেখাবে
    Header এ Bearer Token লাগবে
    """
    return current_user


@router.put("/update", response_model=UserResponse)
def update_profile(
    update_data: UserProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    প্রোফাইল আপডেট করবে
    শুধু পাঠানো field গুলো update হবে, বাকিগুলো আগের মতোই থাকবে
    """
    if update_data.full_name is not None:
        current_user.full_name = update_data.full_name
    if update_data.career_goal is not None:
        current_user.career_goal = update_data.career_goal
    if update_data.bio is not None:
        current_user.bio = update_data.bio

    db.commit()
    db.refresh(current_user)
    return current_user


@router.delete("/delete")
def delete_account(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """অ্যাকাউন্ট ডিলিট করবে"""
    db.delete(current_user)
    db.commit()
    return {"message": "অ্যাকাউন্ট সফলভাবে ডিলিট হয়েছে"}
