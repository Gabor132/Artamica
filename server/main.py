from flask import Flask
from flask_restful import Api
from controllers.helloworld import HelloWorld
from controllers.user import User
from controllers.environment import Environment
from common.enum.urls import URLs
from common.enum.database_urls import DB_URI
from database.database_handler import mongo
from controllers.artwork import ArtworkID, ArtworkSimple
from common.encoders.json_encoder import JSONEncoder


app = Flask(__name__)
api = Api(app)
api.add_resource(HelloWorld, URLs.INDEX.value)
api.add_resource(ArtworkID, URLs.ART_ID.value)
api.add_resource(ArtworkSimple, URLs.ART.value)
api.add_resource(User, URLs.USER.value)
api.add_resource(Environment, URLs.ENVIRONMENT.value)


app.config["MONGO_URI"] = DB_URI
mongo.init_app(app)

app.json_encoder = JSONEncoder

if __name__ == "__main__":
    app.run(debug=True)
