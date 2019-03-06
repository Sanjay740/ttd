let transactionManager = require("../managers/transaction.manager");

module.exports.inviteUsers = function (request, response) {
  transactionManager
    .inviteUsers(request.body, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};
module.exports.listContactsForInvitation = function (request, response) {
  transactionManager
    .listContactsForInvitation(request.params.id, request.headers["subdomain"])
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.updateTransaction = function (request, response) {
  transactionManager
    .updateTransaction(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getTransactionNumber = function (request, response) {
  transactionManager
    .getTransactionNumber(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.getTransaction = function (request, response) {
  transactionManager
    .getTransaction(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};
module.exports.getTransactionsbyUserId = function (request, response) {
  transactionManager
    .getTransactionsbyUserId(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      console.log(error);

      response.status(error.code).json(error.message);
    });
},

  module.exports.getTransactions = function (request, response) {
    transactionManager
      .getTransactions(request)
      .then(result => {
        response.status(result.code).json(result.data);
      })
      .catch(error => {
        response.status(error.code).json(error.message);
      });
  };

module.exports.assignTask = function (request, response) {
  transactionManager
    .assignTask(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.updateTransactionTask = function (request, response) {
  transactionManager
    .updateTransactionTask(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.startTransaction = function (request, response) {
  transactionManager
    .startTransaction(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      console.log(error, 'error');

      response.status(error.code).json(error.message);
    });
};

module.exports.getUsersByRole = function (request, response) {
  transactionManager
    .getUsersByRole(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.assignContacts = function (request, response) {
  transactionManager
    .assignContacts(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.updateTaskStatus = function (request, response) {
  transactionManager
    .updateTaskStatus(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};


module.exports.updateTransactionStatus = function (request, response) {
  transactionManager
    .updateTransactionStatus(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    });
};

module.exports.saveFormData = function (request, response) {
  transactionManager
    .saveFormData(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    })
}

module.exports.taskDocumentUpload = function (request, response) {
  transactionManager
    .taskDocumentUpload(request)
    .then(result => {
      response.status(result.code).json(result.data);
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    })
};

module.exports.getFormData = function (request, response) {
  transactionManager
    .getFormData(request)
    .then(result => {
      response.status(result.code).json(result.data)
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    })
};

module.exports.saveCalendarEvent = function (request, response) {
  transactionManager
    .saveCalendarEvent(request)
    .then(result => {
      response.status(result.code).json(result.data)
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    })
};

module.exports.getCalendarEvent = function (request, response) {
  transactionManager
    .getCalendarEvent(request)
    .then(result => {
      response.status(result.code).json(result.data)
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    })
};

module.exports.updateUserStatus = function (request, response) {
  transactionManager
    .updateUserStatus(request)
    .then(result => {
      response.status(result.code).json(result.data)
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    })
}

module.exports.addNewTransactionContact = function (request, response) {
  transactionManager
    .addNewTransactionContact(request.body, request.query.transactionId, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.data)
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    })
}

module.exports.getExistingTransactionContacts = function (request, response) {
  transactionManager
    .getExistingTransactionContacts(request.query.transactionId, request.headers['subdomain'])
    .then(result => {
      response.status(result.code).json(result.data)
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    })
}

module.exports.getDataSet = function (request, response) {
  transactionManager
    .getDataSet(request)
    .then(result => {
      response.status(result.code).json(result.data)
    })
    .catch(error => {
      response.status(error.code).json(error.message);
    })
};