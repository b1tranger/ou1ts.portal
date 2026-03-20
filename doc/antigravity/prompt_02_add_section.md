> User

in the page 

courses.html
 create a section above all drop down sections called "All Courses" and list the first entry like other drop down sections using:

3/18/2026 3:41:53	azhar_uddin1120@uits.edu.bd	azhar_uddin1120@uits.edu.bd	Adding Resource	Kazi Md Azhar Uddin Abeer	http://fb.me/4xrhd	All Cse Labs (OLD Curriculum)	https://github.com/4xrhd/cse-lab-course	Course Repositories	CSE	54	


> AI

The new "All Courses" section has been added to 

courses.html
 successfully.

Here's a summary of the changes:

Created an All Courses dropdown section right at the top of the course list.
Added the specified repository (Kazi Md Azhar Uddin Abeer's cse-lab-course) as the first entry formatted similarly to other courses with its GitHub link, student email handle, and description.
The changes are saved and you can now check the results in the browser. Let me know if you need anything else!

---

> User

expanding the drop down sections show the scroll bar that remained hidden before. please keep it hidden always

> AI

I have updated 

style.css
 to fix this issue!

Here's a summary of the changes:

Hidden Scrollbars Globally: I added CSS rules (::-webkit-scrollbar with display: none and scrollbar-width: none) to ensure scrollbars remain completely hidden across all browsers when elements are expanded.
Word Wrapping: I added word-break: break-all and overflow-wrap: anywhere to the repository links (.repo-info a). Long unbroken texts, such as email addresses or GitHub links inside those dropdowns, were likely stretching the container's width and forcing the browser to attempt horizontal scrolling. With this, the text will safely wrap on smaller screens.
The update has been saved, so you can test expanding the drop down sections again and the scroll bar should remain completely hidden!

---

> User


