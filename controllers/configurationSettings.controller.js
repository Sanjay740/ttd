const settingManager = require("../managers/configurationSettings.manager");

module.exports.getClosingLocations = function (request, response) {
  settingManager
    .getClosingLocations(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getClosingLocationById = function (request, response) {
  settingManager
    .getClosingLocationById(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.updateClosingLocation = function (request, response) {
  settingManager
    .updateClosingLocation(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.addClosingLocation = function (request, response) {
  settingManager
    .addClosingLocation(request.body, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.deleteClosingLocation = function (request, response) {
  settingManager
    .deleteClosingLocation(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

// this api is for updating system users.
module.exports.updateUser = function (request, response) {
  settingManager
    .updateUser(request.body.jsonData, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.listRoles = function (request, response) {
  settingManager
    .listRoles(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.addRole = function (request, response) {
  settingManager
    .addRole(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.updateRole = function (request, response) {
  settingManager
    .updateRole(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.deleteRole = function (request, response) {
  settingManager
    .deleteRole(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getRole = function (request, response) {
  settingManager
    .getRole(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

// In place of Below three API_STORE , we can make use of listRoles, listuserGroups, listUsers API_STORE.
module.exports.getUserGroups = function (request, response) {
  settingManager
    .getUserGroups(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.createUserGroup = function (request, response) {
  settingManager
    .createUserGroup(request.body, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getUserGroupById = function (request, response) {
  settingManager.getUserGroupById(request.query.id, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
}

module.exports.updateUserGroup = function (request, response) {
  settingManager
    .updateUserGroup(request.body, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.deleteUserGroup = function (request, response) {
  settingManager
    .deleteUserGroup(request.query.id, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.updateAccessRight = function (request, response) {
  settingManager
    .updateAccessRight(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

// this api is for listing users.
module.exports.listUsers = function (request, response) {
  settingManager
    .listUsers(request.query.getSpecific, request.headers["subdomain"])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.addUsers = function (request, response) {
  settingManager
    .addUsers(request.body.jsonData, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getUserById = function (request, response) {
  settingManager
    .getUserById(request.params.id, request.headers["subdomain"])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getTaskByComponentType = function (request, response) {
  settingManager
    .getTaskByComponentType(request)
    .then(result => {
      response.status(result.code).json(result);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getTasks = function (request, response) {
  settingManager
    .getTasks(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};
module.exports.addTask = function (request, response) {
  settingManager
    .addTask(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};
module.exports.updateTask = function (request, response) {
  settingManager
    .updateTask(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.deleteTask = function (request, response) {
  settingManager
    .deleteTask(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.saveWorkflow = function (request, response) {
  settingManager
    .saveWorkflow(request)
    .then(result => {
      response.status(result.code).json(result);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.updateWorkflow = function (request, response) {
  settingManager
    .updateWorkflow(request)
    .then(result => {
      response.status(result.code).json(result);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getWorkflows = function (request, response) {
  settingManager
    .getWorkflows(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.deleteWorkflow = function (request, response) {
  settingManager
    .deleteWorkflow(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.transactionsaveWorkflow = function (request, response) {
  settingManager
    .addTransactionWorkflow(request)
    .then(result => {
      response.status(result.code).json(result);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

//ManageForms
module.exports.listCustomizedForms = function (request, response) {
  settingManager
    .listCustomizedForms(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};
module.exports.deleteFormbuilderorms = function (request, response) {
  settingManager
    .deleteFormbuilderorms(request.params.id, request.headers["subdomain"])
    .then(result => {
      response.status(result.code).json(result);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

//FormBuilder
module.exports.createForm = function (request, response) {
  settingManager
    .createForm(request)
    .then(result => {
      response.status(result.code).json(result);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};
module.exports.editFormBuilderForm = function (request, response) {
  settingManager
    .editFormBuilderForm(request)
    .then(result => {
      response.status(result.code).json(result);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getFormbuilderFormById = function (request, response) {
  settingManager
    .getFormbuilderFormById(request.params.id, request.headers["subdomain"])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};


module.exports.getTransactionNumber = function (request, response) {
  settingManager
    .getTransactionNumber(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.saveTransactionNumber = function (request, response) {
  settingManager
    .saveTransactionNumber(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};


module.exports.updateTransactionNumber = function (request, response) {
  settingManager
    .updateTransactionNumber(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.configureStateCounty = function (request, response) {
  settingManager
    .configureStateCounty(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};


module.exports.getConfiguredStates = function (request, response) {
  settingManager
    .getConfiguredStates(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getAllStatesCounties = function (request, response) {
  settingManager
    .getAllStatesCounties(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getAllConfiguredStatesCounties = function (request, response) {
  settingManager
    .getAllConfiguredStatesCounties(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.deleteSelectedStateCounty = function (request, response) {
  settingManager
    .deleteSelectedStateCounty(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.removeSelectedCounty = function (request, response) {
  settingManager
    .removeSelectedCounty(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};


module.exports.getEditItemDetail = function (request, response) {
  settingManager
    .getEditItemDetail(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};


module.exports.updateStateCounties = function (request, response) {
  settingManager
    .updateStateCounties(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

//Schedule Closing
module.exports.addClosingSchedule = function (request, response) {
  settingManager
    .addClosingSchedule(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};


//notification Setting
module.exports.getNotificationSetting = function (request, response) {
  settingManager
    .getNotificationSetting(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};


module.exports.updateNotificationSetting = function (request, response) {
  settingManager
    .updateNotificationSetting(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getClosingTeam = function (request, response) {
  settingManager
    .getClosingTeam(request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
}

module.exports.updateClosingTeam = function (request, response) {
  settingManager
    .updateClosingTeam(request.body, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
}