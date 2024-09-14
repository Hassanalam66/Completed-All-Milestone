document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    var profileImageInput = document.getElementById('profileImage');
    var profileImagePreview = document.getElementById('profileImagePreview');
    var resumeOutputElement = document.getElementById('resumeOutput');
    var resumeUrlInput = document.getElementById('resumeUrl');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var experience = document.getElementById('experience').value;
        var skills = document.getElementById('skills').value;
        var resumeUrl = resumeUrlInput.value;
        var imageSrc = '';
        if (profileImageInput.files && profileImageInput.files[0]) {
            var file = profileImageInput.files[0];
            imageSrc = URL.createObjectURL(file);
        }
        var resumeOutput = "\n            <h2>Resume</h2>\n            ".concat(imageSrc ? "<img src=\"".concat(imageSrc, "\" alt=\"Profile Image\" style=\"max-width: 150px; border-radius: 50%; margin-bottom: 10px;\">") : '', "\n            <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name, "</span></p>\n            <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n            <p><strong>Phone Number:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n            <p><strong>Resume URL:</strong> <a href=\"").concat(encodeURI(resumeUrl), "\" target=\"_blank\">").concat(resumeUrl, "</a></p>\n\n            <h3>Education</h3>\n            <p><span id=\"edit-education\" class=\"editable\">").concat(education, "</span></p>\n\n            <h3>Experience</h3>\n            <p><span id=\"edit-experience\" class=\"editable\">").concat(experience, "</span></p>\n\n            <h3>Skills</h3>\n            <p><span id=\"edit-skills\" class=\"editable\">").concat(skills, "</span></p>\n        ");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();
        }
    });
    profileImageInput.addEventListener('change', function (event) {
        var fileInput = event.target;
        var file = fileInput.files ? fileInput.files[0] : null;
        var imagePreview = document.getElementById('profileImagePreview');
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                if ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        }
        else {
            imagePreview.style.display = 'none';
        }
    });
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            var input = document.createElement('input');
            input.type = 'text';
            input.value = currentValue;
            input.classList.add('editing-input');
            input.addEventListener('blur', function () {
                currentElement.textContent = input.value;
                currentElement.style.display = 'inline';
                input.remove();
            });
            currentElement.style.display = 'none';
            (_a = currentElement.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(input, currentElement);
            input.focus();
        });
    });
}
