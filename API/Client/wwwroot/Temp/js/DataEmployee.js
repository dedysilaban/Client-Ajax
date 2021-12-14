// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

/*const { error } = require("jquery");*/

/*const { error } = require("jquery");*/

// Write your JavaScript code.

/*let ubah = document.getElementById("a");
ubah.addEventListener("mouseleave", function () {
    ubah.style.backgroundColor = "brown"
});
ubah.addEventListener("mouseenter", function () {
    ubah.style.backgroundColor = "cyan"
});
$(document).ready(function () {
    $("button#a").click(function () {
        $("#a").css({ "font-size": "150%" });
    });
});
document.getElementById("myBtn").addEventListener("click", myFunction);
function myFunction() {
    alert("https://www.w3schools.com/bootstrap4/default.asp");
}
$(document).ready(function () {
    $(".btn-success").click(function () {
        $(this).css("background-color", "black");
    });
});
*/


/*$(document).ready(function () {
    $("#tableSw").DataTable({
        "ajax": {
            "url": "https://pokeapi.co/api/v2/pokemon/",
            "dataSrc": "results"
        },
        "coloums": [
            {
                "data": "No"
            },
            {"data": "nama"
            }
        ]
    }
});*/

$.ajax({
  /*  url: "https://localhost:44384/API/Employees",*/
    url: "/Employees/GetAll",
    success: function (result) {
        console.log(result);
    }
});

$(document).ready(function () {
    $('#tabelEmployee').DataTable({
        'ajax': {
            'url': "/Employees/GetAll",
           /* 'url': "https://localhost:44384/API/Employees",*/
            'dataType': 'json',
            'dataSrc': '',
        },

        'buttons': [{
            extend: 'excelHtml5',
            name: 'excel',
            title: 'List Employee',
            sheetName: 'Employee',
            text: '',
          /*  className: 'buttonHide fa fa download btn-default',*/
            fileName: 'Data',
            autoFilter: true,
            exportOptions: {
                columns: [0, 1, 2, 3, 4, 5]
            }
        }],
        'columns': [
            {
                "data": null,
                "render": function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {
                "data": "nik"

            },
            {
                "data": "firstname"
            },
            {
                "data": "lastname"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return row['firstname'] + ' ' + row['lastname'];
                }
            },
            {
                "data": "phone"
            },
            /*{
                "data": "",
                "render": function (data, type, row, meta) {
                    if (row['phone'].search(0) == 0) {
                        return row['phone'].replace('0', '+62');
                    } else {
                        return row['phone'];
                    }
                }
            },*/
            {
                "data": "birthdate"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
/*              mengubah salary menjadi bentuk rupiah pada jquery*/
                    var angka = row['salary'];
                    var reverse = angka.toString().split('').reverse().join(''),
                    ribuan = reverse.match(/\d{1,3}/g);
                    ribuan = ribuan.join(',').split('').reverse().join('');
                    return 'Rp. ' + ribuan + '.00';
                }
            },
            {
                "data": "email"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                     if (row['gender'] == 0) {
                         return ("Male");
                     }
                     else {
                         return ("Female");
                     }
                 }
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                  /*  var button = '<td> <button onclick="getByNIK(' + row['nik'] + ');" class="btn btn-primary btn-sm text-center" data-toggle="modal" data-target="#EmployeeModal"><i class="fa fa-edit"></i> </button> \ <button onclick="Delete(' + row['nik'] + ');" class="btn btn-danger btn-sm text-center" ><i class="fa fa-trash"></i></button></td>';
                    return button;*/
                    var button = '<td>' +
                        '<button type="button" onclick="GetDataNIK(' + row['nik'] + ');"class="btn btn-primary text-center" data-toggle="modal" data-toggle="tooltip" data-placement="Update" title="Update" data-target="#EmployeeModal"><i class="fa fa-edit"></i></button>' + ' ' +
                        '<button type="button" onclick="Delete(' + row['nik'] + ');" class="btn btn-danger text-center data-toggle="tooltip" data-placement="Delete" title="Delete""><i class="fa fa-trash"></i></button>' +
                        '</td > ';
                    return button;
                }
            }
        ]
    });

    $("#EmployeeForm").validate({
        rules: {
            "NIK": {
                required: true
            },
            "firstName": {
                required: true
            },
            "lastName": {
                required: true
            },
            "phone": {
                required: true
            },
            "birthDate": {
                required: true
            },
            "salary": {
                required: true
            },
            "email": {
                required: true,
                email: true
            },
            "gender": {
                required: true,
            }
        },
        messages: {
            NIK: "Please enter your NIK",
            firstName: "Please enter your First Name",
            lastName: "Please enter your Last Name",
            phone: "Please enter your Phone",
            birthDate: "Please enter your Birth Date",
            salary: "Please enter your Salary",
            email: "Please enter a valid Email Address",
            gender: "Please enter your Gender"

        },
        errorPlacement: function (error, element) { },
        highlight: function (element) {
            $(element).closest('.form-control').addClass('is-invalid');
        },
        unhighlight: function (element) {
            $(element).closest('.form-control').removeClass('is-invalid');
            $(element).closest('.form-control').addClass('is-valid ');
        }
    });
    $('#btnAdd').click(function (e) {
        e.preventDefault();
        if ($("#EmployeeForm").valid() == true) {
            Add();
        }
    });
});

function eExcel() {
    var dataEmployee = $('#tabelEmployee').DataTable();
    dataEmployee.buttons('excel:name').trigger();
}

function InsertEmployee() {
    var obj = new Object();
    obj.NIK = $("#NIK").val();
    obj.Firstname = $("#FirstName").val();
    obj.Lastname = $("#LastName").val();
    obj.Phone = $("#Phone").val();
    obj.Birthdate = $("#Birthdate").val();
    obj.Salary = $("#Salary").val();
    obj.Email = $("#Email").val();
    obj.gender = $("#Gender").val();
    console.log(JSON.stringify(obj));
    $.ajax({
        url: "/Employees/Post",
        type: "POST",
        data: obj,
        success: function (result) { //we got the response
            /* alert('Successfully called');*/
            Swal.fire({
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            }).then(function () {
                window.location.reload();
            });
            $('#EmployeeModal').modal('hide');
        },

        error: function (jqxhr, status, exception) {
/*            alert('Exception:', exception);*/
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            });
        }
    })
}

function GetDataNIK(NIK) {
    $.ajax({
        url: "/Employees/Get/" + NIK,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var Tgl = result.birthdate.substr(0, 10);
            $("#NIK").val(result.nik);
            $("#FirstName").val(result.firstname);
            $("#LastName").val(result.lastname);
            $("#Phone").val(result.phone);
            $("#Birthdate").val(Tgl);
            $("#Salary").val(result.salary);
            $("#Email").val(result.email);
            if (result.gender == "Male") {
                $("#Gender").val(0);
            } else {
                $("#Gender").val(1);
            };
            $("#btnUpdate").show();
            $("#btnAdd").hide();
        },
        error: function (errormessage) {
            swal({
                title: "FAILED",
                text: "DATA TIDAK DITEMUKAN!",
                icon: "error"
            });
        }
    })
}

function Update() {
    var nik = $("#NIK").val();

    var obj = new Object();
    obj.NIK = $("#NIK").val();
    obj.Firstname = $("#FirstName").val();
    obj.Lastname = $("#LastName").val();
    obj.Phone = $("#Phone").val();
    obj.Birthdate = $("#BirthDate").val();
    obj.Salary = $("#Salary").val();
    obj.Email = $("#Email").val();
    obj.Gender = $("#Gender").val();
    /*    console.log(obj);*/

    console.log(JSON.stringify(obj));

    $.ajax({
        url: "https://localhost:44384/API/Employees/" + nik,
        type: "PUT",
        data: JSON.stringify(obj),
       /* data: { id: nik, entity: obj },*/
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    }).done((result) => {
        /*success: function (result) {*/
        $("#NIK").val("");
        $("#FirstName").val("");
        $("#LastName").val("");
        $("#Phone").val("");
        $("#Birthdate").val("");
        $("#Salary").val("");
        $("#Email").val("");
        $("#Gender").val("");
        Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            ConfirmButtonText: 'Oke',
        }).then(function () {
            window.location.reload();
        })
    }).fail((error) => {
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        });
       /* error: function (jqxhr, status, exception) {
            alert('Exception:', exception);
        }*/
        /*error: function (errormessage) {
             Swal.fire({
                 title: "Failed!",
                 text: "DATA GAGAL UPDATE!!",
                 icon: "error",
                 button: "Close",
             });
         }*/
    })
}

function Delete(NIK) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/Employees/Delete/" + NIK,
                type: "DELETE",
            }).done((result) => {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                $('#tabelEmployee').DataTable().ajax.reload();
            }).fail((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
            })
        }
    })
}






/*function InsertEmployee() {
    var obj = new Object();
    obj.NIK = $("#NIK").val();
    obj.Firstname = $("#FirstName").val();
    obj.Lastname = $("#LastName").val();
    obj.Phone = $("#Phone").val();
    obj.Birthdate = $("#Birth").val();
    obj.Salary = $("#Salary").val();
    obj.Email = $("#Email").val();
    obj.gender = $("#Gender").val();
    console.log(JSON.stringify(obj));

    $.ajax({
        url: "https://localhost:44384/API/Employees",
        type: "POST",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
    }).done((result) => {

        //buat alert pemberitahuan jika success
        //alert(result.messageResult)
        Swal.fire(
            'Yeayy',
            result.messageResult,
            'success'
        )
        tableEmployee.ajax.reload();
        $('.createEmployee').modal('hide');

    }).fail((error) => {

        Swal.fire(
            'Opps!',
            error,
            'error'
        )
        //alert pemberitahuan jika gagal
    })
}
*/

/*function Insert() {

    var obj = new Object();
    obj.NIK = $("#NIK").val();
    obj.FirstName = $("#FirstName").val();
    obj.LastName = $("#LastName").val();
    obj.Phone = $("#Phone").val();
    obj.BirthDate = $("#BirthDate").val();
    obj.Salary = $("#Salary").val();
    obj.Email = $("#Email").val();
    obj.Gender = $("#Gender").val();

    console.log(obj);

    $.ajax({
        url: "https://localhost:44384/API/Employees",
        type: "POST",
        data: { id: nik, entity: obj }
    }).done((result) => {

        $('#tabelEmploye').DataTable().ajax.reload();
                $('#mModal').modal('hide');
    }).fail((error) => {
    })
}*/



