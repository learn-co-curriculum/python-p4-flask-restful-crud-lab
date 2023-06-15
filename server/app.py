#!/usr/bin/env python3

from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, Plant

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///plants.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

class Plants(Resource):

    def get(self):
        # getting all plans and creating list of dictionaries
        plants = [plant.to_dict() for plant in Plant.query.all()]
        return make_response(jsonify(plants), 200)

    def post(self):

        #get data from request object
        data = request.get_json()

        #creating new Plant instance with the data from request
        new_plant = Plant(
            name=data['name'],
            image=data['image'],
            price=data['price'],
        )

        # add new plant
        db.session.add(new_plant)
        # commit to db
        db.session.commit()

        return make_response(new_plant.to_dict(), 201)

    
    

api.add_resource(Plants, '/plants')

class PlantByID(Resource):

    def get(self, id):
        # find plant by id
        plant = Plant.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(plant), 200)

    def patch(self, id):
        # find plant by id
        # this is another way of finding plant by id
        # using .get(id) instead of filter_by(id=id)
        plant = Plant.query.get(id)
        # get data from request object 
        # this is another way of getting data
        # instead of request.to_json(), using request.json
        data = request.json

        ## update dynamically every key-value
        for attr in data:
                setattr(plant, attr, data[attr])

        # add updated plant
        db.session.add(plant)
        # commit to db
        db.session.commit()

        return make_response(plant.to_dict(), 200)

    def delete(self, id):
        # find plant by id
        plant = Plant.query.get(id)

        # delete plant
        db.session.delete(plant)
        # commit to db
        db.session.commit()

        return make_response('', 204)

api.add_resource(PlantByID, '/plants/<int:id>')  
        

if __name__ == '__main__':
    app.run(port=5555, debug=True)
