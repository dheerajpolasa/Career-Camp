{
  const studentDropdown = $('#students-list-dropdown');
  const newInterviewBtn = $('#new-interview-btn');
  const interviewDetailsModal = $('#interview-details-modal');
  const interviewModalLink = $('.interview-modal-link');

  function fetchStudentDetialsDropDown(e) {
    if ($('#students-list-dropdown').children().length > 1) {
      return;
    }
    // $('#students-list-dropdown')
    //   .append(`<option id="student-loader"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    // </option>`);

    $('#student-list-loader').css('display', 'block');
    $.ajax({
      type: 'get',
      url: '/student/all',
      success: function (data) {
        for (let student of data.data.students) {
          let optionDOM = getSelectOptionDOM(student);
          $('#student-list-loader').css('display', 'none');
          $('#students-list-dropdown').append(optionDOM);
        }
      },
      error: function (err) {},
    });
  }

  function getSelectOptionDOM(student) {
    return `
      <option value="${student._id}">${student.name}</option>
    `;
  }

  function submitNewInterviewForm(e) {
    e.preventDefault();
    $(e.target).attr('disabled', true);
    $(e.target).html(`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span>Loading</span>
    `);

    $.ajax({
      type: 'post',
      url: $('#new-interview-form').attr('action'),
      data: $('#new-interview-form').serialize(),
      success: function (data) {
        const newInterview = getNewInterviewDOM(data.data.interview);
        $('#interviews-list').prepend(newInterview);
        $('#new-interview-form').get(0).reset();
        $('#create-interview-modal').modal('toggle');
        sendNotySuccess('New interview is created...!');
        $('.interview-modal-link').click(addActive);
        $(interviewDetailsModal).on('hide.bs.modal', changeActive);
      },
      error: function (err) {},
    });
    $(e.target).attr('disabled', false);
    $(e.target).html(`Submit`);
  }

  function getNewInterviewDOM(interview) {
    return `
    <a data-url="/interview/${interview._id}" data-toggle="modal" data-target="#interview-details-modal" class="list-group-item list-group-item-action interview-modal-link"><span>${interview.student.name}</span><span>${interview.company}</span></a>
    `;
  }

  function fetchInterviewDetails(e) {
    let element = $(e.relatedTarget);
    let url = element.data('url');
    $('#interview-details-modal-body').empty();
    $('#interview-details-modal-body').html(`
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    `);
    $.ajax({
      type: 'get',
      url: url,
      success: function (data) {
        let interview = data.data.interview;
        interview.date = new Date(interview.date).toDateString();
        const interviewDetailsDOM = getInterviewDetailsDOM(interview);
        $('#interview-details-modal-body').empty();
        $('#interview-details-modal-body').prepend(interviewDetailsDOM);
        $('#update-interview-form-btn').click(updateInterview);
        if (interview.result !== '') {
          $('#inlineFormCustomSelectPref').val(interview.result);
        }
      },
      error: function (err) {},
    });
  }

  function getInterviewDetailsDOM(interview) {
    return `
      <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span>Student Name</span> <span>${interview.student.name}</span></li>
          <li class="list-group-item"><span>Company Name</span> <span> ${interview.company}</span></li>
          <li class="list-group-item"><span>Date</span> <span>${interview.date}</span></li>
        </ul>
        <form class="form-inline" id="update-interview-form" action="/interview/update/${interview._id}">
          <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" name="result">
            <option selected>Choose status...</option>
            <option value="PASS">PASS</option>
            <option value="FAIL">FAIL</option>
            <option value="On Hold">On Hold</option>
            <option value="Did not Attempt">Did not Attempt</option>
          </select>

          <button type="button" class="btn btn-primary my-1" id="update-interview-form-btn">Submit</button>
        </form>
      </div>
    `;
  }

  function addActive(e) {
    if ($(e.target).is('span')) {
      $(e.target).parent().addClass('active');
      $(e.target).parent().css('color', 'white');
    } else {
      $(e.target).addClass('active');
      $(e.target).css('color', 'white');
    }
  }

  function changeActive(e) {
    $('.interview-modal-link').each(function (index, element) {
      $(element).removeClass('active');
      $(element).css('color', 'black');
    });
  }

  function updateInterview(e) {
    e.preventDefault();
    console.log('hey');
    const url = $('#update-interview-form').attr('action');

    console.log(url);
    $.ajax({
      type: 'post',
      url: url,
      data: $('#update-interview-form').serialize(),
      success: function (data) {
        console.log(data);
        sendNotySuccess(data.message);
      },
      error: function (err) {},
    });
  }

  function init() {
    $(newInterviewBtn).click(submitNewInterviewForm);
    $(studentDropdown).click(fetchStudentDetialsDropDown);
    $(interviewDetailsModal).on('show.bs.modal', fetchInterviewDetails);
    $(interviewModalLink).click(addActive);
    $(interviewDetailsModal).on('hide.bs.modal', changeActive);
  }

  init();
}
