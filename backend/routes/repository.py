from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from urllib.parse import urlparse

from services.github_service import get_repository


router = APIRouter(
    prefix="/api/repositories",
    tags=["Repositories"]
)


class RepositoryRequest(BaseModel):
    url: str


def parse_github_url(url: str):
    parsed_url = urlparse(url)

    if parsed_url.netloc.lower() not in {
        "github.com",
        "www.github.com"
    }:
        raise ValueError("Please provide a valid GitHub repository URL")

    path_parts = [
        part for part in parsed_url.path.strip("/").split("/")
        if part
    ]

    if len(path_parts) < 2:
        raise ValueError("Invalid GitHub repository URL")

    owner = path_parts[0]
    repo = path_parts[1]

    if repo.endswith(".git"):
        repo = repo[:-4]

    return owner, repo


@router.post("/analyze")
def analyze_repository(request: RepositoryRequest):

    try:
        owner, repo = parse_github_url(request.url)

        repository = get_repository(owner, repo)

        return {
            "success": True,
            "repository": {
                "name": repository["name"],
                "full_name": repository["full_name"],
                "description": repository["description"],
                "url": repository["html_url"],
                "stars": repository["stargazers_count"],
                "forks": repository["forks_count"],
                "language": repository["language"],
                "default_branch": repository["default_branch"],
            }
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )