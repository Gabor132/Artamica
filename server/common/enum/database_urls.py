from enum import Enum
from common.environment.environment_handler import EnvironementKeys, handler as env_handler


class DatabaseUrls(Enum):
    LOCAL_URL = "mongodb://localhost:27017/Artamica"
    URL = "mongodb+srv://{0}:{1}@myapps.k714c.mongodb.net/{2}?retryWrites=true&w=majority"


# Setting up DB variables
db_user_name = env_handler.get(EnvironementKeys.DB_USER)
db_user_password = env_handler.get(EnvironementKeys.DB_PASSWORD)
db_name = "Artamica"
DB_URI = ""
if env_handler.isDev():
    DB_URI = DatabaseUrls.LOCAL_URL.value
else:
    DB_URI = DatabaseUrls.URL.value.format(db_user_name, db_user_password, db_name)