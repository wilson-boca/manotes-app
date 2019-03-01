'use strict';

manotesServices.service('Alert', ['$q', 'sweetAlert', function($q, SweetAlert) {
  this.showAlert = function(title, text, type) {
    console.log(SweetAlert.swal);
    debugger;
    return SweetAlert.swal(
      title,
      text,
      type
    );
  };

  this.success = function(title, text) {
    var deferrer = $q.defer();
    console.log(SweetAlert);
    SweetAlert.swal(
      {
        title: title,
        text: text,
        type: 'success',
        timer: 4000,
        showConfirmButton: false
      }
    ).then(
      function() {
        deferrer.resolve();
      },
      function() {
        deferrer.reject();
      }
    );

    return deferrer.promise;
  };

  this.info = function(title, text) {
    return this.showAlert(title, text, 'info');
  };

  this.error = function(title, text) {
    return this.showAlert(title, text, 'error');
  };

  this.loading = function(title, text) {
    SweetAlert.swal({
      title: title,
      text: text,
      type: 'info',
      showConfirmButton: false,
      allowEscapeKey: false
    });
  };

  this.warning = function(title, text, confirmText, callback) {
    SweetAlert.swal({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancelar'
    }).then(callback, callback);
  };

  this.inform = function(title, text, confirmText, callback) {
    SweetAlert.swal({
      title: title,
      text: text,
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancelar'
    }).then(
      function() {
        callback(true);
      },
      function() {
        callback(false);
      }
    );
  };

  this.confirm = function(title, message, confirmText, inputPlaceholder, callback) {
    SweetAlert.swal({
        title: title,
        text: message,
        type: "input",
        confirmButtonText: confirmText,
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        animation: "slide-from-top",
        inputPlaceholder: inputPlaceholder,
        showLoaderOnConfirm: true
      }).then(
        function() {
          callback(true);
        },
        function() {
          callback(false);
        }
      );
  };

  this.warningFiles = function(title, message, confirmText, promise_function, functionSuccess, functionError) {

    SweetAlert.swal({
      title: title,
      html: message,
        type: 'warning',
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      animation: "slide-from-top",
      showLoaderOnConfirm: true,
      preConfirm: function() {
        return new Promise(function (resolve, reject) {
          var promise = promise_function();
          promise.then(
            function (msgSuccess) {
              resolve(msgSuccess);
            },
            function (msgError) {
              reject(msgError);
            }
          );
        })
      }
    }).then(function(data) {
      if (data.hasOwnProperty('dismiss') ) {
        return false;
      }

      functionSuccess();
    }, function (error) {
      functionError()

    });
    $q.resolve()
  };
  this.confirmInfoMessage = function (title, text, function_success, confirmButton, cancelButton) {
    if (!confirmButton) {
      confirmButton = "Sim"
    }
    if (!cancelButton) {
      cancelButton = "Cancelar"
    }
    SweetAlert.swal({
      title: title,
      html: text,
      confirmButtonText: confirmButton,
      cancelButtonText: cancelButton,
      type: 'info',
      showCancelButton: true,
      animation: "slide-from-top",
      showLoaderOnConfirm: true,
      preConfirm: function() {
      return new Promise(function(resolve) {
        function_success();
        resolve()

      })
    }
  }).then(function() {

    })

  };

  this.close = function() {
    SweetAlert.close();
  };
}]);