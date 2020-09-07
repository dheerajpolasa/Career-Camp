{
  const createStudent = $('#create-student-btn');
  const studentDetailsModal = $('#student-details-modal');
  const studentModalLink = $('.student-modal-link');

  function validateStudentFormAndSendAjaxRequest(e) {
    e.preventDefault();
    let flag = true;
    $('#new-student-form *')
      .filter(':input')
      .each(function (index, element) {
        const name = $(element).attr('name');
        if ($(element).val() == '' || $(element).val() == '') {
          sendNotyError(`${name} is required`);
          flag = false;
        }
      });

    if (flag === false) return;
    $(e.target).attr('disabled', true);
    $(e.target).html(`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span>Loading</span>
    `);
    $.ajax({
      type: 'post',
      url: $('#new-student-form').attr('action'),
      data: $('#new-student-form').serialize(),
      success: function (data) {
        const newStudent = getStudentDOM(data.data.student);
        $('#students-list').prepend(newStudent);
        $('#new-student-form').get(0).reset();
        $('#create-student-modal').modal('toggle');
        sendNotySuccess('New Student Record is created...!');
        $('.student-modal-link').click(addActive);
        $(studentDetailsModal).on('hide.bs.modal', changeActive);
      },
      error: function (err) {},
    });

    $(e.target).attr('disabled', false);
    $(e.target).html(`Create`);
  }

  function getStudentDOM(student) {
    return `
    <a data-url="/student/${student._id}" data-toggle="modal" data-target="#student-details-modal" class="list-group-item list-group-item-action student-modal-link">${student.name}</a>
    `;
  }

  function fetchStudentDetails(e) {
    let element = $(e.relatedTarget);
    let url = element.data('url');
    console.log(e.target);
    $('#student-details-modal-body').empty();
    $('#student-details-modal-body').html(`
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    `);
    console.log(url);

    $.ajax({
      type: 'get',
      url: url,
      success: function (data) {
        const studentDetailsDOM = getStudentDetailsDOM(data.data.student);
        $('#student-details-modal-body').empty();
        $('#student-details-modal-body').prepend(studentDetailsDOM);
      },
      error: function (err) {},
    });
  }

  function getStudentDetailsDOM(student) {
    return `
      <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span>Name</span> <span>${student.name}</span></li>
          <li class="list-group-item"><span>Email</span> <span> ${student.email}</span></li>
          <li class="list-group-item"><span>Phone Number</span><span>${student.phoneNumber}</span></li>
          <li class="list-group-item"><span>College</span><span>${student.college}</span></li>
          <li class="list-group-item"><span>Batch</span><span>${student.batch}</span></li>
          <li class="list-group-item"><span>Status</span><span>${student.status}</span></li>
          <li class="list-group-item"><span>DSA</span><span>${student.dsa_final_score}</span></li>
          <li class="list-group-item"><span>WebD</span><span>${student.webd_final_score}</span></li>
          <li class="list-group-item"><span>React</span><span>${student.react_final_score}</span></li>
        </ul>
      </div>
    `;
  }

  // To send Noty Error
  function sendNotyError(message) {
    new Noty({
      theme: 'relax',
      layout: 'topRight',
      timeout: 1500,
      type: 'error',
      text: message,
    }).show();
  }

  // To send Noty Success
  function sendNotySuccess(message) {
    new Noty({
      theme: 'relax',
      layout: 'topRight',
      timeout: 1500,
      type: 'success',
      text: message,
    }).show();
  }

  function addActive(e) {
    $(e.target).addClass('active');
    $(e.target).css('color', 'white');
  }

  function changeActive(e) {
    $('.student-modal-link').each(function (index, element) {
      $(element).removeClass('active');
      $(element).css('color', 'black');
    });
  }

  function downloadFile(e) {
    e.preventDefault();

    $.ajax({
      type: 'get',
      url: '/interview/download/all',
      success: function (data) {
        console.log(data);

        $.ajax({
          type: 'get',
          url: '/downloads/list.csv',
          success: function (data) {},
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

  function init() {
    $(createStudent).click(validateStudentFormAndSendAjaxRequest);
    $(studentDetailsModal).on('show.bs.modal', fetchStudentDetails);
    $(studentModalLink).click(addActive);
    $(studentDetailsModal).on('hide.bs.modal', changeActive);
    // $('#download-csv-btn').click(downloadFile);
  }

  init();
}
