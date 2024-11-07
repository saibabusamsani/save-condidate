// Initial data
const toGetAllData = [
    { id: 1, name: "Saibabu", location: "Hyderabad", education: "Computer Science, (Btech)", graduationYear: "2019-2023", skills: ["Java", "Sql", "Javascript"], experience: "1", Gender: "M" },
    { id: 2, name: "Rohit sharma", location: "Mumbai", education: "accounting and finance, Bachelor of Commerce (B.Com)", graduationYear: "2020-2023", skills: ["Javascript"], experience: "4", Gender: "M" },
    { id: 3, name: "Ms dhoni", location: "Chennai", education: "Automotive, Master of Technology (M.Tech)", graduationYear: "2019-2021", skills: ["Javascript"], experience: "2", Gender: "M" },
    { id: 4, name: "Virat kohli", location: "Hyderabad", education: "Computer Science, B.Tech", graduationYear: "2020-2024", skills: ["Html", "CSS"], experience: "1", Gender: "M" },
    { id: 5, name: "Rishab pant", location: "Delhi", education: "Automotive, Master of Technology (M.Tech)", graduationYear: "2019-2021", skills: ["Python", "React"], experience: "1", Gender: "M" },
    { id: 6, name: "Jahnavi", location: "Mumbai", education: "Computer Science,(Btech)", graduationYear: "2012-16", skills: ["Python"], experience: "10", Gender: "F" },
    { id: 7, name: "Hardhik Pandya", location: "Mumbai", education: "DECS, Master of Technology (M.Tech)", graduationYear: "2013-2015", skills: ["Javascript"], experience: "9", Gender: "M" },
    { id: 8, name: "Samantha", location: "Delhi", education: "DECS, Master of Technology (M.Tech)", graduationYear: "2016-2020", skills: ["Javascript", "Hibernate"], experience: "9", Gender: "F" }
];

// Main container for cards
const container = document.getElementById("cards-container");
container.innerHTML = "";

// Function to create and display all cards
function displayCards(data) {
    container.innerHTML = ""; // Clear any existing cards
    data.forEach(person => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Card Top Section
        const cardTop = document.createElement("div");
        cardTop.classList.add("top");

        const top1 = document.createElement("div");
        const top2 = document.createElement("h4");
        const top3 = document.createElement("div");

        // Define class names
        top1.classList.add("top1");
        top2.classList.add("h4");
        top3.classList.add("top3");

        top3.style.color="rgb(54, 152, 237)";

        

        top2.textContent = "Certified in Digital Marketing by Internshala things";
        top2.classList.add("top2")

        // top3
        const score = document.createElement("h5");
        score.classList.add("h5")
        score.textContent = "view candidate score";

        const scoreIcon = document.createElement("i");
        scoreIcon.classList.add("far", "fa-edit");
       

        top3.append(score,scoreIcon);

        // Top1 - Icon and Title
        const icon = document.createElement("i");
        icon.style.marginTop = "-2px";
        icon.style.color = "yellow";
        icon.classList.add("fas", "fa-star");

        const title = document.createElement("h6");
        title.style.marginTop = "5px";
        title.textContent = "Top applicant";

        top1.append(icon, title);
        
        // Append to card top
        cardTop.append(top1, top2, top3);

        // Append card top to card
        card.append(cardTop);

        // Append card to container
        container.append(card);

        // card body

        const cardBody =document.createElement("div");
        cardBody.classList.add("card-body")

        card.append(cardBody);



        // two blocks

        const leftBLock =document.createElement("div");
        const rightBLock =document.createElement("div");

        leftBLock.classList.add("left-block");
        rightBLock.classList.add("right-block");

        cardBody.append(leftBLock,rightBLock);


        // for left block

        const checkBox=document.createElement("input");
        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("id","name");

        const name= document.createElement("label");
        name.setAttribute("for","name");
        name.textContent="saibabu";
        
        const nameBlock=document.createElement("div");
        nameBlock.classList.add("name-block")

        nameBlock.append(checkBox,name);

        
        //  for icons -experience, money , location
        
        
        const iconsList=document.createElement("div");
        iconsList.classList.add("icons-list");
        const iconClasses=[{icon:"fas fa-shopping-bag",info:"1 yrs 0 m"},{icon:"fa-solid fa-wallet",info:"12.5lacs"},{icon:"fa-solid fa-location-dot",info:"Hyderabad"}];

        for(let i=0;i<3;i++)
        {
            const item=document.createElement("div");
            item.classList.add("item");
            
            const icon=document.createElement("i");
            icon.classList.add("icon")

            const classNames=iconClasses[i].icon.split(" ");
            icon.classList.add(...classNames);

            const info=document.createElement("p");
            info.classList.add("info");
            info.textContent=iconClasses[i].info;

            item.append(icon,info)
            iconsList.append(item);
        }

        //  for current educations,skills etc

        const personInfo=[
            {
                title:"Current",
                info:"Software developer at ISOFT Ltd noida working on wordpress"
            },
            {
                title:"Education",
                info:"Computer Science, (Btech),(2019-2023)"
            },
            {
                title:"Skills",
                info:"Java,sql"
            },
            {
                title:"Pre.locations",
                info:"Vizag,hyderabad"
            },
            {
                title:"Cover letter",
                info:"I have capable skils on this to do the job and I also have an experience in internship in digital marketing."
            },
            {
                title:"Availability",
                info:"Yes, I am available to join immediately. And can relocate to "
            }

        ];
       const personData= document.createElement("div");
       personData.classList.add("person-data");
        personInfo.forEach((data)=>{
            const set=document.createElement("div");
            set.classList.add("set")

            const title=document.createElement("p");
                title.textContent=data.title;

            const info=document.createElement("p");
            info.textContent=data.info;
            set.append(title,info)
            personData.append(set);

         
        })
        
        
        leftBLock.append(nameBlock,iconsList,personData)

        //  right block

        const profile=document.createElement("img");
        profile.classList.add("profile")
        profile.src="../assets/kohli.jpg"

        const profileTitle=document.createElement("h6");
        profileTitle.style.fontSize="11px"
        profileTitle.textContent="B.tech(I.t) Software Developer with 5.6 experience"

        const numberBtn=document.createElement("button");
        const callBtn=document.createElement("button");
        const verifyBtn=document.createElement("button");
        numberBtn.classList.add("profile-button");
        callBtn.classList.add("profile-button");
        verifyBtn.classList.add("verify-button");

        numberBtn.textContent="View phone number";
        callBtn.textContent="Call candidate";
        verifyBtn.textContent="verified phone and email";

        const cmt=document.createElement("button");
        cmt.textContent="comment";
        cmt.classList.add("comment")
//  save container 
        const saveBox=document.createElement("div");
        saveBox.classList.add("save-box")
        const save=document.createElement("button");
        save.classList.add("save-btn")
        save.textContent="save";

        const cmtBOx=document.createElement("div");
        cmtBOx.classList.add("cmt-box");

        const saveIcon=document.createElement("i");
        saveIcon.classList.add("fas","fa-save")
        saveBox.append(save,saveIcon)

        cmtBOx.append(cmt,saveBox);


        rightBLock.append(profile,profileTitle,numberBtn,callBtn,verifyBtn,cmtBOx);


        //  Card bottom

        const cardBottom=document.createElement("div");
        cardBottom.classList.add("card-bttom");

        card.append(cardBottom)

        const btmLeft = document.createElement("div");
        btmLeft.classList.add("btm-left")
        const btmRgt = document.createElement("div");
        btmRgt.classList.add("btm-right")
        cardBottom.append(btmLeft,btmRgt);


        const viewApplication=document.createElement("button");
        viewApplication.textContent="View Application";
        viewApplication.classList.add("view-btn");

        const addNote=document.createElement("div");
        // addNote.style.marginTop="2vw"
        addNote.classList.add("Add-note");

        const noteIcon=document.createElement("i");
        noteIcon.classList.add("fa-regular","fa-note-sticky","note-icon");
        const note=document.createElement("p");
        note.textContent="Add note";

        addNote.append(noteIcon,note);

        btmLeft.append(viewApplication,addNote)

        //  btm right

       const intrst= document.createElement("button");
       const shortList= document.createElement("button");
       const nextStep=document.createElement("div");

       nextStep.classList.add("next-step")

       const np1=document.createElement("p");
       np1.textContent="Next steps";
       np1.style.marginTop="1vw"
       const arrowIcon=document.createElement("i");
       arrowIcon.classList.add("fa-solid","fa-angle-down");

       nextStep.append(np1,arrowIcon)
       btmRgt.append(intrst,shortList,nextStep);


        intrst.textContent="Not intersted";
        shortList.textContent="Shortlist"

        intrst.classList.add("intrst");
        shortList.classList.add("shortlist")


        

    });
}

// Initial display of all cards
displayCards(toGetAllData);

// Search function to filter and display cards by name
function searchNames() {
    const nameInput = document.getElementById("input-name").value.toLowerCase();
    const filteredData = toGetAllData.filter(person => person.name.toLowerCase().includes(nameInput));

    // Display only the filtered cards
    displayCards(filteredData);
}

// Example of attaching search function to an input event
document.getElementById("input-name").addEventListener("input", searchNames);




