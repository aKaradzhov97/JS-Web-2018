$(document).ready(function () {
    $("#deleteMemeBtn").click(function () {
        let url = window.location.search;
        let id = url.replace("?id=", ''); // remove the ?id=

        $.ajax({
            url: '/api/delete',
            data: {
                id: id
            },
            type: 'DELETE',
            success: function () {
                $("#contentDiv").remove();
                $("#deletedMemeTextBox").text('Deleted successfully.')
            }
        });
    })
});

