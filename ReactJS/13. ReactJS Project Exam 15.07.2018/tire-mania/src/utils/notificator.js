import $ from 'jquery';

$(() => {
    let loading = 0;
    $(document).on({
        ajaxStart: () => {
            if (!loading) $('#loadingBox').fadeIn();
            loading++;
            $('#errorBox').fadeOut();
        },
        ajaxStop: () => setTimeout(() => {
            loading--;
            if (!loading) $('#loadingBox').fadeOut();
        }, 500)
    });

    $('#infoBox').click((event) => $(event.target).fadeOut());
    $('#errorBox').click((event) => $(event.target).fadeOut());
});

function showInfo(message) {
    let infoBox = $('#infoBox');
    infoBox.text(message);
    infoBox.show();
    setTimeout(() => infoBox.fadeOut(), 3000);
}

function showError(message) {
    let errorBox = $('#errorBox');
    errorBox.text(message);
    errorBox.show();
}

function handleError(reason) {
    showError(reason.responseJSON.description);
}

export default {
    handleError,
    showInfo,
    showError,
};