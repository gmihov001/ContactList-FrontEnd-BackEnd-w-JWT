"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Contact
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity
import datetime, json, os 


api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def login():
    credentials = request.json
    email = credentials.get('email', None)
    password = credentials.get('password', None)
    user = User.query.filter_by(email=email, password=password).first()
    
    if user is None:
        return jsonify({"msg": "Invalid email or password"}), 401

    expires = datetime.timedelta(days=7)
    access_token = create_access_token(identity=email, expires_delta=expires)

    return jsonify(user=email, token=access_token), 200    

@api.route('/user', methods=['POST'])
def register():
    info = request.json 
    user_exists = User.query.filter_by(email=info['email'])
    if user_exists:
        raise APIException('This user already exists', status_code=409)
    else:    
        new_user = User(email=info['email'], password=info['password'])
        db.session.add(new_user)
        db.session.commit()

        user_created = User.query.filter_by(email=info['email'])
        if user_created:
            return jsonify("The user has been created"), 200    
        else:    
            raise APIException("User registration failed", status_code=500)

@api.route('/contacts', methods=['GET'])
def get_all_contacts():
    contacts = Contact.query.all()
    contacts = list(map(lambda x:x.serialize(), contacts))
    return jsonify(contacts), 200            

@api.route('/contacts', methods=['POST'])
def add_contact():
    body = request.json
    new_contact = Contact(full_name=body["full_name"], email=body["email"], phone=body["phone"], address=body["address"])
    db.session.add(new_contact)
    db.session.commit()

    contact_created = Contact.query.filter_by(full_name=body['full_name'])
    if contact_created:
        return jsonify(contacts), 200    
    else:    
        raise APIException("Contact was not saved", status_code=500)

@api.route('/contacts', methods=['PUT'])
def update_contact():
    body = request.json
    contact = Contact.query.get(body['id'])

    if contact is None:
        raise APIException('User not found', status_code=404)

    if "email" not in body and "password" not in body: 
        raise APIException('No new data was received', status_code=404)
    
    if "email" in body:
        contact.email = body['email']

    if "password" in body:    
        contact.password = body['password']

    db.session.commit()
    
    
    new_contact = Contact(full_name=body["full_name"], email=body["email"], phone=body["phone"], address=body["address"])
    db.session.add(new_contact)
    db.session.commit()

    contact_created = Contact.query.filter_by(full_name=body['full_name'])
    if contact_created:
        return jsonify(contacts), 200    
    else:    
        raise APIException("Contact was not saved", status_code=500)
