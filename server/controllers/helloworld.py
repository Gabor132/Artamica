from controllers.controller import Controller


class HelloWorld(Controller):
    def get(self):
        return {"data": "Hello World"}
