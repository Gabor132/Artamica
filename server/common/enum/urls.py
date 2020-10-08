from enum import Enum


class URLs(Enum):
    INDEX = "/"
    USER = "/users"
    ART = "/artworks"
    ART_ID = "/artworks/<string:artwork_id>"
    ENVIRONMENT = "/isDev"
