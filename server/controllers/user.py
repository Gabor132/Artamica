from controllers.controller import Controller


users = {}

class User(Controller):
    def get(self):
        return {"data": "Nothing here"}

