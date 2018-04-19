/**
 * @param {{healthrecordid:string}} HTTP request param for health record id.
 */
/**
 * @param {{configid:string}} HTTP request param for configuration id.
 */

var mongoose = require('mongoose');
var global = require('./socket/global');
Project = mongoose.model('Project');

ProjectService = {
    /**
     * Retrieves all Projects from MongoDB and sorts by Project Number
     * @param req
     * @param res
     */
    findAndSort : function(req, res){
        Project
            .find({})
            .sort({ number: 1 })
            .exec(function (err, response){
                var result = {
                    status: 200,
                    message: response
                };
                if (err){
                    result.status = 500;
                    result.message = err;
                } else if (!response){
                    result.status = 404;
                    result.message = err;
                }
                res.status(result.status).json(result.message);
            });
    },

    /**
     * Creates new Project in MongoDB.
     * @param req
     * @param res
     */
    add : function(req, res){
        Project
            .create(req.body, function (err, response){
                var result = {
                    status: 201,
                    message: response
                };
                if (err){
                    result.status = 500;
                    result.message = err;
                } else if (!response){
                    result.status = 404;
                    result.message = err;
                }
                res.status(result.status).json(result.message);
            });
    },

    /**
     * Retrieves project by its Id.
     * @param req
     * @param res
     */
    findById: function(req, res){
        var id = req.params.id;
        Project
            .findById(id)
            .exec(function (err, response){
                var result = {
                    status: 200,
                    message: response
                };
                if (err){
                    result.status = 500;
                    result.message = err;
                } else if (!response){
                    result.status = 404;
                    result.message = err;
                }
                res.status(result.status).json(result.message);
            });
    },

    /**
     * Removes Project.
     * @param req
     * @param res
     */
    delete : function(req, res){
        var id = req.params.id;
        Project
            .remove({ '_id': id }, function (err, response){
                var result = {
                    status: 201,
                    message: response
                };
                if (err){
                    result.status = 500;
                    result.message = err;
                } else if (!response){
                    result.status = 404;
                    result.message = err;
                }
                res.status(result.status).json(result.message);
            });
    },

    /**
     * Updates Project in a MongoDB.
     * @param req
     * @param res
     */
    update : function(req, res) {
        var id = req.params.id;
        Project
            .update(
                { "_id": id },
                req.body,
                { upsert: true }, function (err, response){
                    var result = {
                        status: 202,
                        message: response
                    };
                    if (err){
                        result.status = 500;
                        result.message = err;
                    } else if (!response){
                        result.status = 404;
                        result.message = err;
                    }
                    res.status(result.status).json(result.message);
                });
    },

  findAll : function(req, res){
    Project.find({},function(err, results) {
      return res.send(results);
    });
  },

    populateById : function (req, res) {
      var id = req.params.id;
      Project
          .findById(id)
          .populate({ path: 'configurations'})
          .exec(function (err, doc) {
              var response = {
                  status: 200,
                  message: doc
              };
              if(err){
                  response.status = 500;
                  response.message = err;
              } else if(!doc){
                  response.status = 404;
                  response.message = { "message": "Project Id not found " + id};
              }
              res
                  .status(response.status)
                  .json(response.message);
          });
  },

  //  findByConfigurationId : function(req, res){
  //   var id = req.params.configid;
  //   Project.find({'configurations':id},function(err, result) {
  //     return res.send(result);
  //   });
  // },
  //
  // findByOffice : function(req, res){
  //   var office_name = req.params.office;
  //   Project.find({'office':office_name},function(err, result) {
  //     return res.send(result);
  //   });
  // },

  populateSheets : function (req, res) {
      var id = req.params.id;
      Project
          .findById(id)
          .populate({ path: 'sheets'})
          .exec(function (err, doc) {
              var response = {
                  status: 200,
                  message: doc
              };
              if(err){
                  response.status = 500;
                  response.message = err;
              } else if(!doc){
                  response.status = 404;
                  response.message = { "message": "Project Id not found " + id};
              }
              res
                  .status(response.status)
                  .json(response.message);
          });
  },

   addConfiguration : function(req, res){
        var projectId = req.params.id;
        var configId = req.params.configid;
        Project
            .update(
                { _id:projectId},
                { $push:{configurations: configId }}, function(err, numberAffected){
                    if(err) return console.log(err);
                    return res.sendStatus(202);
                });
   },
    addHealthRecord : function(req, res){
       var projectId = req.params.id;
       var healthRecordId = req.params.healthrecordid;
       Project
           .update(
               { _id: projectId},
               { $push:{ healthrecords: healthRecordId }},
               function(err, project){
                   if(err) {
                       console.log(err);
                       res
                           .status(201)
                           .json(err);
                   } else {
                       res
                           .status(201)
                           .json();
                   }
               });
   },

    /**
     *
     * @param req
     * @param res
     */
    addSheets : function(req, res){
        var projectId = req.params.id;
        var sheetsId = req.params.sheetsid;
        Project
            .update(
                { _id: projectId},
                { $push:{ sheets: sheetsId }},function (err, response){
                    var result = {
                        status: 202,
                        message: response
                    };
                    if (err){
                        result.status = 500;
                        result.message = err;
                    } else if (!response){
                        result.status = 404;
                        result.message = err;
                    }
                    res.status(result.status).json(result.message);
                });
    },

  deleteConfiguration: function(req, res){
	  var projectId = req.params.id;
	  var configId=req.params.configid;
	  Project.update(
		{ _id:projectId},
		{ $pull:{configurations: configId}},
		function(err, data){
			if(err) return console.log(err);
			return res.sendStatus(202);
	  });
  }
  };

module.exports = ProjectService;