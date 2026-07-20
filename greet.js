function greet() {

    alert("Your information has been submitted successfully!");

    console.table([
        {
            Student_Name: "Demo Student",
            Practical: "JavaScript"
        }
    ]);

    console.time("Program Execution");

    for (let i = 1; i <= 50000; i++) {
    }

    console.timeEnd("Program Execution");
}