from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# ---- রেজিস্ট্রেশনের সময় ইউজার যা পাঠাবে ----
class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    career_goal: Optional[str] = None

# ---- লগইনের সময় ইউজার যা পাঠাবে ----
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ---- প্রোফাইল আপডেটের সময় ইউজার যা পাঠাবে ----
class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    career_goal: Optional[str] = None
    bio: Optional[str] = None

# ---- API Response — ইউজারের তথ্য ফেরত দেওয়ার সময় (পাসওয়ার্ড ছাড়া) ----
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    career_goal: Optional[str]
    bio: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True  # SQLAlchemy model থেকে সরাসরি convert করতে

# ---- JWT Token Response ----
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
