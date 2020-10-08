from os import environ
from enum import Enum


class EnvironmentHandler:
    def get(self, key):
        return environ.get(key.name)

    def isDev(self):
        return environ.get(EnvironementKeys.ENVIRONMENT.value) == "development"


class EnvironementKeys(Enum):
    DB_USER = "DB_USER"
    DB_PASSWORD = "DB_PASSWORD"
    ENVIRONMENT = "FLASK_ENV"


handler = EnvironmentHandler()
