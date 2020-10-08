from flask_restful import Resource
from common.environment.environment_handler import handler as env_handler


class Environment(Resource):
    def get(self):
        return env_handler.isDev()
