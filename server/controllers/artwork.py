from bson import ObjectId

from controllers.controller import Controller
from flask_restful import reqparse, abort
from flask import jsonify
from database.database_handler import artwork_handler

artwork_put_args = reqparse.RequestParser()
artwork_put_args.add_argument("name", type=str, help="Name of the artwork is required", required=True)
artwork_put_args.add_argument("type", type=str, help="Type of the artwork is required", required=True)
artwork_put_args.add_argument("creator", type=str, help="Name of the artwork creator is required", required=True)


def abort_if_artwork_not_exists(artwork_id):
    if artwork_handler.get_entity(artwork_id) is None:
        abort(http_status_code=404, message="Artwork ID is not valid")


def abort_if_no_artworks():
    if artwork_handler.get_entities() is None:
        abort(http_status_code=404, message="Artwork collection is empty")


def abort_if_artwork_exists(artwork_id):
    if artwork_handler.get_entity(artwork_id) is not None:
        abort(http_status_code=409, message="Artwork already exists")


class ArtworkID(Controller):
    def get(self, artwork_id):
        artwork_id = ObjectId(artwork_id)
        abort_if_artwork_not_exists(artwork_id)
        artwork = artwork_handler.get_entity(artwork_id)
        return jsonify(artwork)

    def delete(self, artwork_id):
        artwork_id = ObjectId(artwork_id)
        abort_if_artwork_not_exists(artwork_id)
        artwork_handler.delete_entity(artwork_id)
        return jsonify('')


class ArtworkSimple(Controller):
    def get(self):
        abort_if_no_artworks()
        return jsonify(artwork_handler.get_entities())

    def put(self):
        args = artwork_put_args.parse_args()
        artwork_handler.save_entity(args)
        return jsonify(args)
