document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-add-row]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var template = document.querySelector(btn.getAttribute('data-template'));
            var target = document.querySelector(btn.getAttribute('data-target'));
            var clone = template.content.cloneNode(true);
            target.appendChild(clone);
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target.matches('[data-remove-row]')) {
            e.target.closest('.admin-repeat-row').remove();
        }
    });
});
