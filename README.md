
Basic frontend for SELECTION/ANNOTATION kind of tasks. Can be used in data collection for machine learning based applications.

Some references:
 * [AJAX Calls in JQuery](http://api.jquery.com/jquery.ajax/)
 * [AJAX Calls with JSON body](http://stackoverflow.com/questions/12693947/jquery-ajax-how-to-send-json-instead-of-querystring)
 * [Get the body of a Failed AJAX Call](http://stackoverflow.com/questions/2084484/getting-ajax-response-body-for-use-in-error-callback)
 * [Sending multipart/formdata in a AJAX Call](http://stackoverflow.com/questions/5392344/sending-multipart-formdata-with-jquery-ajax)
 * [Access the file selected in a "file" input with knockout.js](http://stackoverflow.com/questions/16930869/how-to-access-file-input-with-knockout-binding)
 * [Bluebird library](http://bluebirdjs.com/docs/getting-started.html)
 * [line-drawer component](https://gitlab.com/AWT2017/line-drawer)

# Headers
In order to guarantee security and isolation each student will have a unique APIKey that will be used to authenticate against the server.

## APIKey

An APIKey is of the format `3F2504E0-4F89-11D3-9A0C-0305E82C3301` and is required during user registration and login.
It must be sent as part of the `Authorization` HTTP Header in the format `APIKey 3F2504E0-4F89-11D3-9A0C-0305E82C3301`.

## APIToken
A User Token is of the format `3F2504E0-4F89-11D3-9A0C-0305E82C3301`, it is returned after login and is required for every request, and should be destroyed at logout.
It must be sent as part of the `Authorization` HTTP Header in the format `APIToken 3F2504E0-4F89-11D3-9A0C-0305E82C3301`.

# Errors
Success and Error messages are returned through the HTTP status code.

Status codes follow the standard:
[rfc2616](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

Positive Status Codes are:
 * __200 (OK)__ the request was managed properly
 * __201 (Created)__ A new resource was created, the `Location` header will contain the url of the new resource

Negative Status Codes are:
 * __400 (Bad Request)__ some of the provided parameters are wrong or missing
 * __401 (Unauthorized)__ missing or invalid `Authorization` header, `WWW-Authenticate` will contain the requested type of authorization `APIKey` or `APIToken`
 * __404 (Not Found)__ the requested resource doesn't exists
 * __412 (Precondition Failed)__ the request cannot be fulfilled due to a precondition (Duplicated username, Campaign already started)

Responses with errors may contain one or more error descriptions in the format.

## Single error responses
```json
{
    "error": "THE DESCRIPTION OF THE ERROR"
}
```

## Multi error responses
```json
{
    "error": {
        "username": "ERROR RELATED TO THE username FIELD",
        "password": "ERROR RELATED TO THE password FIELD",
    }
}
```

# Registration
A new user can be registered in the platform using the following endpoint.

```
POST /api/user
```

The `Authorization` header must contain the APIKey.
The `Content-Type` of the request must be `application/json`.
The body must be of the format:

```json
{
    "fullname": "John Doe",
    "username": "john_is_the_best",
    "password": "amazing_password",
    "type": "master or worker"
}
```

# Authorization
A new user can be registered in the platform using the following endpoint.

```
POST /api/auth
```

The `Authorization` header must contain the APIKey.
The `Content-Type` of the request must be `application/json`.
The body must be of the format:

```json
{
    "username": "john_is_the_best",
    "password": "amazing_password"
}
```

A successful answer will be of format:

```json
{
    "token": "3F2504E0-4F89-11D3-9A0C-0305E82C3301"
}
```

A user can disable its current token (logout) by using the following endpoint.

```
DELETE /api/auth
```

The `Authorization` header must contain the APIToken.

# User
The following endpoints can be used to obtain information on the current user and edit them.

```
GET /api/user/me
```
Will return the information of the current user.
The `Authorization` header must contain the APIToken.

A successful answer will be of format:

```json
{
    "fullname": "John Doe",
    "username": "john_is_the_best",
    "type": "master or worker"
}
```


```
PUT /api/user/me
```
Can be used to change the information of the current user.
The `Authorization` header must contain the APIToken.
The `Content-Type` of the request must be `application/json`.
The body must be of the format:

```json
{
    "fullname": "an optional different fullname",
    "password": "an optional different password"
}
```

# Campaign
The following endpoints can be used to obtain information on campaigns of the current user and create new ones.

```
GET /api/campaign
```
Will return the list of all the campaigns of the current user.
The `Authorization` header must contain the APIToken.

The answer will be of format:
```json
{
    "campaigns": [
        {
            "id": "URL OF THE CAMPAIGN",
            "name": "NAME OF THE CAMPAIGN",
            "status": "THE STATUS OF THE CAMPAIGN (ready, started, ended)"
        }
    ]
}
```

```
POST /api/campaign
```
Will create a new campaign for the current user.
The `Authorization` header must contain the APIToken.
The `Content-Type` of the request must be `application/json`.
The body must be of the format:

```json
{
    "name": "NAME OF THE CAMPAIGN",
    "selection_replica": 123,
    "threshold": 45,
    "annotation_replica": 67,
    "annotation_size": 8
}
```
The answer will contain a `Location` Header with the url of the new resource.

Given the url of a campaign, obtained with the previous APIs, it is possible to:

## Obtain campaign information
```
GET <<campaign url>>
```
The `Authorization` header must contain the APIToken.
The body of the answer will be in the format:
```json
{
    "id": "campaign url",
    "name": "NAME OF THE CAMPAIGN",
    "status": "THE STATUS OF THE CAMPAIGN (ready, started, ended)",
    "selection_replica": "SELECTION REPLICA OF THE CAMPIAGN",
    "threshold": "THRESHOLD TO ENABLE AN IMAGE FOR ANNOTATION",
    "annotation_replica": "ANNOTATION REPLICA OF THE CAMPAIGN",
    "annotation_size": "ANNOTATION SIZE OF THE CAMPAIGN",
    "image": "campaign images url",
    "worker": "campaign workers url",
    "execution": "campaign execution state url",
    "statistics": "campaign statistics url"
}
```

## Edit the campaign
```
PUT <<campaign url>>
```
The `Content-Type` of the request must be `application/json`.
The body must be of the format as for campaign creation.

Given the `campaign images url` it is possible to:

## List the images in the campaign
```
GET <<campaign images url>>
```
The `Authorization` header must contain the APIToken.
The body of the answer will be in the format:
```json
{
    "images": [
        {
            "id": "IMAGE URL",
            "canonical": "CANONICAL URL OF THE IMAGE (can be used in img tags without Authorization)"
        }
    ]
}
```

## Upload a new image
```
POST <<campaign images url>>
```
The `Authorization` header must contain the APIToken.
The `Content-Type` of the request must be `multipart/form-data`.
The body of the request must contain a field with a name of your choice containing a JPEG file.
The answer will contain a `Location` Header with the url of the new resource.

Given an `image url` it is possible to:

## Get image infos
```
GET <<image url>>
```
The `Authorization` header must contain the APIToken.
The body of the answer will be in the format:
```json
{
    "id": "IMAGE URL",
    "canonical": "CANONICAL URL OF THE IMAGE (can be used in img tags without Authorization)",
    "statistics": "image statistics url",
}
```

## Delete an image
```
DELETE <<image url>>
```
The `Authorization` header must contain the APIToken.

Given an `image statistics url` it is possible to:

## Get image Statistics
```
GET <<image statistics url>>
```
The `Authorization` header must contain the APIToken.
The body of the answer will be in the format:
```json
{
    "selection": {
        "accepted": "NUMBER OF POSITIVE SELECTIONS",
        "rejected": "NUMBER OF NEGATIVE SELECTIONS"
    },
    "annotation": [
        "ANNOTATION",
        "OTHER ANNOTATION"
    ]
}
```

Given the `campaign workers url` it is possible to:

## List the workers in the campaign
```
GET <<campaign workers url>>
```
The `Authorization` header must contain the APIToken.
The body of the answer will be in the format:
```json
{
    "workers": [
        {
            "id": "woker url",
            "fullname": "FULLNAME OF THE WORKER",
            "selector": "IS THE WORKER A SELECTOR",
            "annotator": "IS THE WORKER AN ANNOTATOR"
        }
    ]
}
```

Given an `worker url` it is possible to:

## Get worker infos
```
GET <<worker url>>
```
The `Authorization` header must contain the APIToken.
The body of the answer will be in the format:
```json
{
    "id": "woker url",
    "fullname": "FULLNAME OF THE WORKER",
    "selector": "IS THE WORKER A SELECTOR",
    "annotator": "IS THE WORKER AN ANNOTATOR",
    "selection": "worker selection url",
    "annotation": "worker annotation url"
}
```

Given an `worker selection url` it is possible to:

## Enable the worker for selection
```
POST <<worker selection url>>
```
The `Authorization` header must contain the APIToken.

## Disable the worker for selection
```
DELETE <<worker selection url>>
```
The `Authorization` header must contain the APIToken.

Given an `worker annotation url` it is possible to:

## Enable the worker for annotation
```
POST <<worker annotation url>>
```
The `Authorization` header must contain the APIToken.

## Disable the worker for annotation
```
DELETE <<worker annotation url>>
```
The `Authorization` header must contain the APIToken.

Given an `campaign execution url` it is possible to:

## Start the campaign
```
POST <<campaign execution url>>
```
The `Authorization` header must contain the APIToken.

## Terminate the campaign
```
DELETE <<campaign execution url>>
```
The `Authorization` header must contain the APIToken.

Given an `campaign statistics url` it is possible to:

## Get image Statistics
```
GET <<campaign statistics url>>
```
The `Authorization` header must contain the APIToken.
The body of the answer will be in the format:
```json
{
    "images": "NUMBER OF IMAGES IN THE CAMPAIGN",
    "accepted": "NUMBER OF ACCEPTED IMAGES",
    "rejected": "NUMBER OF REJECTED IMAGES",
    "annotation": "NUMBER OF ANNOTATIONS"
}
```

# Task
The following endpoints can be used to obtain information on tasks of the current user.

```
GET /api/task
```
Will return the list of all the task of the user is enabled for.
The `Authorization` header must contain the APIToken.

The answer will be of format:
```json
{
    "tasks": [
        {
            "id": "task url",
            "type": "TYPE OF THE TASK (selection, annotation)"
        }
    ]
}
```

Given an `task url` it is possible to:

## Get task information
```
GET <<task url>>
```
The `Authorization` header must contain the APIToken.
The body of the answer will be in the format:
```json
{
    "id": "task url",
    "type": "TYPE OF THE TASK (selection, annotation)",
    "campaign": "NAME OF THE CAMPAIGN",
    "session": "task session url",
    "statistics": "task statistics url",
}
```

Given an `task session url` it is possible to:

## Start a working session for the task
```
POST <<task session url>>
```
The `Authorization` header must contain the APIToken.

## Get the next task instance (the next image to work on)
```
GET <<task session url>>
```
The `Authorization` header must contain the APIToken.
A __404 (Not Found)__ answer means `no more images`.
A __410 (Gone)__ answer means `no more images for now` you may try to start a new session.
The body of the answer will be in the format:
```json
{
    "type": "TYPE OF THE TASK (selection or annotation)",
    "image": "URL OF THE IMAGE (can be used in img tags without Authorization)",
    "size": "SIZE OF THE ANNOTATION (just for annotation tasks)"
}
```

## Send the current result
```
PUT <<task session url>>
```
The `Authorization` header must contain the APIToken.
The `Content-Type` of the request must be `application/json`.
The body must be of the format:

For selection tasks
```json
{
    "accepted": "true or false"
}
```

For annotation tasks
```json
{
    "skyline": "STRING DESCRIBING THE SKYLINE (see the line-drawer component)"
}
```

Given an `tasks statistics url` it is possible to:

## Get task Statistics
```
GET <<task statistics url>>
```
The `Authorization` header must contain the APIToken.
The body of the answer will be in the format:
```json
{
    "available": "NUMBER OF AVAILABLE IMAGES",
    "accepted": "NUMBER OF ACCEPTED IMAGES (just for selection)",
    "rejected": "NUMBER OF REJECTED IMAGES (just for selection)",
    "annotated": "NUMBER OF ANNOTATED IMAGES (just for annotation)"
}
```
