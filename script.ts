document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const profileImageInput = document.getElementById('profileImage') as HTMLInputElement;
    const profileImagePreview = document.getElementById('profileImagePreview') as HTMLImageElement;
    const resumeOutputElement = document.getElementById('resumeOutput') as HTMLDivElement;
    const resumeUrlInput = document.getElementById('resumeUrl') as HTMLInputElement;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
        const resumeUrl = (resumeUrlInput as HTMLInputElement).value;

        let imageSrc = '';
        if (profileImageInput.files && profileImageInput.files[0]) {
            const file = profileImageInput.files[0];
            imageSrc = URL.createObjectURL(file);
        }

        const resumeOutput = `
            <h2>Resume</h2>
            ${imageSrc ? `<img src="${imageSrc}" alt="Profile Image" style="max-width: 150px; border-radius: 50%; margin-bottom: 10px;">` : ''}
            <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
            <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
            <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
            <p><strong>Resume URL:</strong> <a href="${encodeURI(resumeUrl)}" target="_blank">${resumeUrl}</a></p>

            <h3>Education</h3>
            <p><span id="edit-education" class="editable">${education}</span></p>

            <h3>Experience</h3>
            <p><span id="edit-experience" class="editable">${experience}</span></p>

            <h3>Skills</h3>
            <p><span id="edit-skills" class="editable">${skills}</span></p>
        `;

        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();
        }
    });

    profileImageInput.addEventListener('change', function (event) {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput.files ? fileInput.files[0] : null;

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target?.result) {
                    profileImagePreview.src = e.target.result as string;
                    profileImagePreview.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        } else {
            profileImagePreview.style.display = 'none';
        }
    });
});

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";
            const input = document.createElement('input') as HTMLInputElement;
            input.type = 'text';
            input.value = currentValue;
            input.classList.add('editing-input');

            input.addEventListener('blur', function () {
                currentElement.textContent = input.value;
                currentElement.style.display = 'inline';
                input.remove();
            });

            currentElement.style.display = 'none';
            currentElement.parentElement?.insertBefore(input, currentElement);
            input.focus();
        });
    });
}
