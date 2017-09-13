var project = require('./models/project');
var configuration = require('./models/configuration');
var triggerrecord = require('./models/trigger_record');
var healthReport = require('./models/healthrecords-model');
var addins = require('./models/addins-model');
 
 module.exports = function(app) {
		
	var projects = require('./controller/projects');
	app.get('/api/v1/projects', projects.findAll);
	app.get('/api/v1/projects/sort', projects.findAndSort);
    app.get('/api/v1/projects/:id', projects.findById);
	app.get('/api/v1/projects/populate/:id', projects.populateById);
	app.get('/api/v1/projects/populatehr/:id', projects.populateHealthRecords);
	// app.get('/api/v1/projects/populatehr/:id/process', projects.populateHealthRecordsProcess);
	app.get('/api/v1/projects/configid/:configid', projects.findByConfigurationId);
	app.get('/api/v1/projects/office/:office', projects.findByOffice);
    app.post('/api/v1/projects', projects.add);
    app.put('/api/v1/projects/:id', projects.update);
	app.put('/api/v1/projects/:id/addconfig/:configid', projects.addConfiguration);
	app.put('/api/v1/projects/:id/addhealthrecord/:healthrecordid', projects.addHealthRecord);
	app.put('/api/v1/projects/:id/deleteconfig/:configid', projects.deleteConfiguration);
    app.delete('/api/v1/projects/:id', projects.delete);
	
	var config = require('./controller/configurations');
	app.get('/api/v1/configurations', config.findAll);
    app.get('/api/v1/configurations/:id', config.findById);
	app.get('/api/v1/configurations/filepath/:filepath*', config.findByFilePath);
	app.get('/api/v1/configurations/uri/:uri*', config.findByEncodedURI);
	app.get('/api/v1/configurations/:id/updaterid/:updaterid', config.findByUpdaterId);
    app.post('/api/v1/configurations', config.add);
    app.put('/api/v1/configurations/:id', config.update);
    app.delete('/api/v1/configurations/:id', config.delete);

	var triggerrecords = require('./controller/triggerrecords');
	app.get('/api/v1/triggerrecords', triggerrecords.findAll);
    app.get('/api/v1/triggerrecords/:id', triggerrecords.findById);
	app.get('/api/v1/triggerrecords/centralpath/:centralpath*', triggerrecords.findByFilePath);
	app.get('/api/v1/triggerrecords/updaterid/:updaterid', triggerrecords.findByUpdaterId);
	app.get('/api/v1/triggerrecords/uniqueid/:uniqueid', triggerrecords.findByUniqueId);
	app.get('/api/v1/triggerrecords/configid/:configid', triggerrecords.findByConfigId);
    app.post('/api/v1/triggerrecords', triggerrecords.add);
    app.put('/api/v1/triggerrecords/:id', triggerrecords.update);
    app.delete('/api/v1/triggerrecords/:id', triggerrecords.delete);
	app.delete('/api/v1/triggerrecords/config/:configid', triggerrecords.deleteAllForConfig);
	app.delete('/api/v1/triggerrecords/centralpath/:centralpath', triggerrecords.deleteAllForFile);

	var healthReport = require('./controller/healthrecords-controller');
    app.get('/api/v1/healthrecords', healthReport.findAll);
    app.get('/api/v1/healthrecords/:id', healthReport.findById);
    app.get('/api/v1/healthrecords/uri/:uri*', healthReport.findByEncodedURI);
    app.post('/api/v1/healthrecords', healthReport.add);
    app.post('/api/v1/healthrecords/:id/onsynched', healthReport.onSynched);
    app.post('/api/v1/healthrecords/:id/onopened', healthReport.onOpened);
    app.post('/api/v1/healthrecords/:id/itemcount', healthReport.postItemCount);
    app.post('/api/v1/healthrecords/:id/viewstats', healthReport.viewStats);
    app.get('/api/v1/healthrecords/:id/viewstats', healthReport.getViewStats);
    app.post('/api/v1/healthrecords/:id/linkstats', healthReport.postLinkStats);
    app.get('/api/v1/healthrecords/:id/linkstats', healthReport.getLinkStats);
    app.post('/api/v1/healthrecords/:id/familystats', healthReport.postFamilyStats);
    app.get('/api/v1/healthrecords/:id/familystats', healthReport.getFamilyStats);
    app.post('/api/v1/healthrecords/:id/modelsize', healthReport.postModelSize);
    app.post('/api/v1/healthrecords/:id/modelopentime', healthReport.postModelOpenTime);
    app.post('/api/v1/healthrecords/:id/modelsynchtime', healthReport.postModelSynchTime);
    app.post('/api/v1/healthrecords/:id/sessioninfo', healthReport.postModelSessionInfo);
    app.put('/api/v1/healthrecords/:id/sessioninfo/:logid', healthReport.updateSynchedCollection);
    app.get('/api/v1/healthrecords/:id/modelstats', healthReport.getModelStats);

    var addins = require('./controller/addins-controller');
    app.get('/api/v1/addins', addins.findAll);
    app.post('/api/v1/addins', addins.add);
    app.post('/api/v1/addins/:id/addlog', addins.addLog);
  };