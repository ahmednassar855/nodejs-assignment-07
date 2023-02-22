# Assignment 7:
# using mongoose & express
# create user model (name, email, age, password )
# create blog model ( content, addedBy )

# user

# 1- sign up   >> done
# 2- sign in(send token to user that contain user id , email and name )   >> done
# 3- update user (user must be logged in and account owner only can do this)   >> done
# 4- delete user (user must be logged in and account owner only can do this)   >> done
# 5- get user data (user must be logged in and account owner only can do this)   >> done

# Blog APIs:
# 1- add blog(don't send user id use token) >>>done
# 2- update blog (blog owner only and use token) >> done
# 3- delete blog ( blog owner only only and use token) >> done
# 4- get all blogs with their owner's information  >> done
# 5- get blog by id >> done 
# Using Middleware and validation

<!-- Start Date 20.Feb-2023   -->

1. Package installation
    1. npm init -y
    2. npm i mongoose bcrypt express joi jsonwebtoken 
    3. or yarn add express mongoose bcrypt jsonwebtoken joi
    4. express-node  at index file
    5. app.use(express.json())   dont forget to call this to trnaslate buffer

2. database Connection
    1. make file dbConnection
    2. call function of dbConnection at index file

3. build data base shcemas
    * make new folder models
        1. user.model.js
        2. blog.model.js

4. build module stracture
    * new folder src >> user , blog folder inside it
    * make new file user.controller 
        1. sign up
            1. import userModel
            2. make the firsy end point of sign up first logical to start the app.
            3. make userRouter file and make first router point and make export defualt for userRouter post,get,put,delete
            4. call userRoutre at index file and defin the first route

            5. make a validation in user signup >>
                * check user if exist or not
                * find >> get all data in array  >> find({})  its mean get all things 
                * findById  find a single document  find() mosh shart akteb find({})
                * findOne betraga3( object )if exist or( null )if not exist
                * hane3ml find for email to check it if exist or not 

                * password hash bycryption  
                * import bcrypt ,  hash password , technique 2 
            6. sign in scenario
                * check user if is exist or not 
                * check the password input and compare it with the register password , if not in correct password
                * if email true , passsword true then log in

            7. jwt 
                * use jwt befor sing in  and make the token 
                * verify token to check it if sign in or not

            8. male middlware for auth by jwt

            9. validation  by joi
                1. create validate schema of joi >> object contains all validataio data reiquired  eg. signUpSchema
                2.  signUpSchema.validate()  >>> is object contains > beta5od el data ely gaya men el postman
                3. receive data from req.body or req.header or query or param >> and recieve the data in objcet , eldata ely rag3aa betkoom 3ebara 3an error or null

                4. nebda2 ne3lm refactor ll code
                5. nefseel el validation schema in seeparate file
                6. we ba3d keda han5elha fe el middleware fe router 
                7. ne3eml feel aweeel file sperate fe folder middlerware esmo validation
                8. ne3eml validation functtion te3mle return >> req , ,res , next
                9. a5ood  el validation eg. ely kan ma3moool fe first step eta3t el signup , a5doo kolo we a7too fe scope beta3 retrun function ely fe rakam 8
            
