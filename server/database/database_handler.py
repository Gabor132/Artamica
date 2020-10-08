# Imports
from flask_pymongo import PyMongo


# Database handling classes
class EntityHandler:
    def get_entity(self, entity_id):
        raise Exception("Method not implemented")

    def save_entity(self, entity):
        raise Exception("Method not implemented")

    def delete_entity(self, entity_id):
        raise Exception("Method not implemented")


class ArtworkHandler(EntityHandler):
    def get_entities(self):
        return mongo.db.artworks.find_one()

    def get_entity(self, artwork_id):
        return mongo.db.artworks.find_one({"_id": artwork_id})

    def save_entity(self, artwork):
        artworks_collection = mongo.db.artworks
        artworks_collection.insert(artwork)
        return True

    def delete_entity(self, artwork_id):
        artworks_collection = mongo.db.artworks
        return False


# Initialize Variables
mongo = PyMongo()
artwork_handler = ArtworkHandler()
