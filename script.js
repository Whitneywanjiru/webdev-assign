
const regForm = document.getElementById("regform");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const genderInput = document.getElementById("gender");
const dobInput = document.getElementById("dob");
const countryInput = document.getElementById("country");
const phoneInput = document.getElementById("phone");
const bioInput = document.getElementById("bio");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const genderError = document.getElementById("genderError");
const dobError = document.getElementById("dobError");
const countryError = document.getElementById("countryError");
const phoneError = document.getElementById("phoneError");
const bioError = document.getElementById("bioError");

const successMsg = document.getElementById("successMsg");
const memberList = document.getElementById("memberList");
const memberCount = document.getElementById("count");
const darkModeButton = document.getElementById("theme");

// Check that the HTML elements were found
console.log({
    regForm,
    nameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
    genderInput,
    dobInput,
    countryInput,
    phoneInput,
    bioInput,
    nameError,
    emailError,
    passwordError,
    confirmError,
    genderError,
    dobError,
    countryError,
    phoneError,
    bioError,
    successMsg,
    memberList,
    memberCount,
    darkModeButton
});

// Validation functions
function validateName() {
    if (nameInput.value.trim().length < 2) {
        nameError.textContent = "Enter your full name (at least 2 characters).";
        return false;
    }

    nameError.textContent = "";
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Please enter your email.";
        return false;
    }

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        return false;
    }

    emailError.textContent = "";
    return true;
}

function validatePassword() {
    if (passwordInput.value === "") {
        passwordError.textContent = "Please enter a password.";
        return false;
    }

    if (passwordInput.value.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        return false;
    }

    passwordError.textContent = "";
    return true;
}

function validateConfirmPassword() {
    if (confirmPasswordInput.value === "") {
        confirmError.textContent = "Please confirm your password.";
        return false;
    }

    if (confirmPasswordInput.value !== passwordInput.value) {
        confirmError.textContent = "Passwords do not match.";
        return false;
    }

    confirmError.textContent = "";
    return true;
}

function validateGender() {
    if (genderInput.value === "") {
        genderError.textContent = "Please select your gender.";
        return false;
    }

    genderError.textContent = "";
    return true;
}

function validateDOB() {
    if (dobInput.value === "") {
        dobError.textContent = "Please enter your date of birth.";
        return false;
    }

    const today = new Date();
    const selectedDate = new Date(dobInput.value + "T00:00:00");

    if (selectedDate > today) {
        dobError.textContent = "Date of birth cannot be in the future.";
        return false;
    }

    dobError.textContent = "";
    return true;
}

function validateCountry() {
    if (countryInput.value.trim() === "") {
        countryError.textContent = "Please enter your country.";
        return false;
    }

    countryError.textContent = "";
    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const digits = phone.replace(/\D/g, "");

    if (phone === "") {
        phoneError.textContent = "Please enter your phone number.";
        return false;
    }

    if (digits.length < 7 || digits.length > 15) {
        phoneError.textContent = "Enter a valid phone number.";
        return false;
    }

    phoneError.textContent = "";
    return true;
}

function validateBio() {
    if (bioInput.value.trim() === "") {
        bioError.textContent = "Please tell us something about yourself.";
        return false;
    }

    bioError.textContent = "";
    return true;
}

// Validate all fields
function validateForm() {
    const results = [
        validateName(),
        validateEmail(),
        validatePassword(),
        validateConfirmPassword(),
        validateGender(),
        validateDOB(),
        validateCountry(),
        validatePhone(),
        validateBio()
    ];

    return results.every(result => result === true);
}

// Clear errors as the user fixes fields
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", () => {
    validatePassword();

    if (confirmPasswordInput.value !== "") {
        validateConfirmPassword();
    }
});
confirmPasswordInput.addEventListener("input", validateConfirmPassword);
genderInput.addEventListener("change", validateGender);
dobInput.addEventListener("change", validateDOB);
countryInput.addEventListener("input", validateCountry);
phoneInput.addEventListener("input", validatePhone);
bioInput.addEventListener("input", validateBio);

// Register a member
regForm.addEventListener("submit", function(event) {
    event.preventDefault();
    successMsg.textContent = "";
    successMsg.classList.add("hidden");

    if (!validateForm()) {
        return;
    }

    const member = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        gender: genderInput.value,
        dob: dobInput.value,
        country: countryInput.value.trim(),
        phone: phoneInput.value.trim(),
        bio: bioInput.value.trim()
    };

    // Remove the empty-list message
    const emptyNote = document.getElementById("emptyNote");

    if (emptyNote) {
        emptyNote.remove();
    }

    // Create a member list item
    const listItem = document.createElement("li");
    listItem.classList.add("member-item");

    const details = document.createElement("div");

    const memberName = document.createElement("h3");
    memberName.textContent = member.name;

    const memberEmail = document.createElement("p");
    memberEmail.textContent = "Email: " + member.email;

    const memberGender = document.createElement("p");
    memberGender.textContent = "Gender: " + member.gender;

    const memberDOB = document.createElement("p");
    memberDOB.textContent = "Date of Birth: " + member.dob;

    const memberCountry = document.createElement("p");
    memberCountry.textContent = "Country: " + member.country;

    const memberPhone = document.createElement("p");
    memberPhone.textContent = "Phone: " + member.phone;

    const memberBio = document.createElement("p");
    memberBio.textContent = "Bio: " + member.bio;

    details.append(
        memberName,
        memberEmail,
        memberGender,
        memberDOB,
        memberCountry,
        memberPhone,
        memberBio
    );

    // Create the remove button
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    removeButton.addEventListener("click", function() {
        listItem.remove();
        updateMemberCount();

        if (memberList.querySelectorAll(".member-item").length === 0) {
            const emptyMessage = document.createElement("li");
            emptyMessage.id = "emptyNote";
            emptyMessage.classList.add("empty");
            emptyMessage.textContent =
                "No members yet. Register someone to begin.";

            memberList.appendChild(emptyMessage);
        }
    });

    listItem.append(details, removeButton);
    memberList.appendChild(listItem);

    updateMemberCount();

    successMsg.textContent =
        "Member registered successfully!";
    successMsg.classList.remove("hidden");

    regForm.reset();
});

// Update the number of registered members
function updateMemberCount() {
    const totalMembers =
        memberList.querySelectorAll(".member-item").length;

    memberCount.textContent = totalMembers;
}

// Toggle Dark Mode
darkModeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeButton.textContent = "Light Mode";
    } else {
        darkModeButton.textContent = "Dark Mode";
    }
});
