from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import auth, tasks
from .routers import users   

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Management API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(users.router)   

@app.get("/")
def root():
    return {"message": "Task Management API running"}