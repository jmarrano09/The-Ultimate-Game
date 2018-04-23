$(document).ready(function () {
	var userId = location.search.split("=") || [0, 1];
	userId = userId[1];
	$(".nav-links").each(function () {
		if (userId) {
			$(this).attr("href", $(this).attr("href") + "?ch=" + userId);
		}
		else {
			$(this).attr("href", $(this).attr("href") + "?ch=1");
		}
	});

	function runModal() {
		$("#modal-title").text("Don't Leave Your Friends Hang'n");
		$("#modal-text").text("Oh no!  The Evil Wizard is about to hang your friend in a devious game of hangman! Save your precious pet from this necklace of death, and move on to the final round where you can confront the evildoer!");
		$("#game-modal").modal("toggle");
	  };
	  runModal();

	function genGame() {

		let userText = $('<span>')
			.attr("id", "user-text")
			.text("Letter you are guessing: ");

		let genButton = $('<button>')
			.attr("id", "generatePick")
			.text("click to generate hangman choice")
			.attr("class", "btn btn-success btn-lg");

		let clearButton = $('<button>')
			.attr("onclick", "clearPick()")
			.attr("id", "startHangmanOver")
			.text("Start Hangman Over")
			.attr("class", "btn btn-warning btn-lg");

		let winCount = $('<div>')
			.attr("id", "Winner")
			.attr("class", "row")
			.attr("class", "hm-item")
			.text("Your wins: ");

		let successText = $('<span>')
			.attr("id", "successText")
			.attr("class", "row")
			.attr("class", "hm-item")
			.text("success text");

		let messagePick = $('<span>')
			.attr("id", "messagePick")
			.attr("class", "row")
			.attr("class", "hm-item")
			.text("Are you ready? Choose wisely.");

		let hangWord = $('<span>')
			.attr("id", "Hangman")
			.attr("class", "row")
			.attr("class", "hm-item")
			.text("hangman word");

		let badGuesses = $('<span>')
			.attr("id", "badGuess")
			.attr("class", "row")
			.attr("class", "hm-item")
			.text("Failed letters: "); // bad guesses

		let guessesLeft = $('<span>')
			.attr("id", "remainingGuesses")
			.attr("class", "row")
			.attr("class", "hm-item")
			.text("Remaining guesses: "); // guesses Left


		let game = $('<div>')
			.height(600)
			.css("background-image", "url(images/background.png)")
			.attr("class", "playgames")
			.append(userText)
			.append(genButton)
			.append(clearButton)
			.append(winCount)
			.append(messagePick)
			.append(hangWord)
			.append(badGuesses)
			.append(guessesLeft);

		$("#hangmangame").append(game);


	};

	genGame();
	


	//========================================================
	//HANGMAN GAME
	//=======================================================
	//Setting up my variables
	//var theList = StevenUniverseChar;
	var randomComputerPick;
	var successPicks = [];
	var failPicks = [];
	var allPicks = [];
	var computerWord = [];
	var displayWord = [];
	var charFailArray = [];
	var spaceCounter = 0;
	var totalCharSuccess = 0;
	var userWins = 0;
	var totalGuesses = 15;
	var displayImg;
	//var emptyCharacters=;
	//The computer automatically picks one of the objects from the list as soon as it starts. 
	//TODO: Change this to onclick so you don't have to refresh the page to enjoy another game use the spacebar

	//var computerPick = listBlackMovies[Math.floor(Math.random() * listBlackMovies.length)];
	var computerPick = "test";
	var upperComputerPick = computerPick.toUpperCase();
	//var upperComputerPick = computerPick.toUpperCase();
	//console.log( computerPick + upperComputerPick);

	// ---------------------------------------------------------------------------------------------------------------------------------//
	// THIS IS THE BUTTON TO CLEAR PREVIOUS HTML //

	function clearPick() {
		var hangDisplay = document.getElementById("Hangman");
		hangDisplay.HTML = null;
		hangDisplay.innerHTML = null;
		successPicks = [];
		failPicks = [];
		allPicks = [];
		computerWord = [];
		displayWord = [];
		charFailArray = [];
		spaceCounter = 0;
		totalCharSuccess = 0;
		totalGuesses = 15;
		displayImg = "";
	};

	function generatePick() {
		var hangDisplay = document.getElementById("Hangman");
		hangDisplay.HTML = null;
		hangDisplay.innerHTML = null;

		successPicks = [];
		failPicks = [];
		allPicks = [];
		computerWord = [];
		displayWord = [];
		charFailArray = [];
		spaceCounter = 0;
		totalCharSuccess = 0;
		totalGuesses = 15;
		//successText.innerHTML = null;
		//messagePick.innerHTML= null;

		computerPick = StevenUniverseChar[Math.floor(Math.random() * StevenUniverseChar.length)];
		console.log("this is the index of computerPick to figure out img Pick :" + StevenUniverseChar.indexOf(computerPick));
		displayImg = StevenUniverseImg[StevenUniverseChar.indexOf(computerPick)];
		console.log(displayImg);
		upperComputerPick = computerPick.toUpperCase();
		for (var i = 0; i < upperComputerPick.length; i++) {
			if (upperComputerPick[i] === ' ') {
				computerWord.push(upperComputerPick[i]);
				displayWord.push(' ');
			}
			else {
				computerWord.push(upperComputerPick[i]);
				displayWord.push('_');
			}
		};

		for (var i = 0; i < upperComputerPick.length; i++) {
			charFailArray.push(i);
		};

		for (var i = 0; i < displayWord.length; i++) {

			var newLetterDiv = document.createElement('div');

			newLetterDiv.innerHTML = displayWord[i];

			hangDisplay.appendChild(newLetterDiv);
		};

		//alert(computerPick);
		// function imgHint() {
		// 	document.querySelector("#imgHint").src = "assets/images/"+displayImg;
		// 	}

		// imgHint()

		var upperComputerPick = computerPick.toUpperCase();
		console.log(computerPick + upperComputerPick);


		//THIS IS THE GOOD STUFF IT CREATES THE ARRAY FOR THE DISPLAY AND PUTS THE COMPUTER PICK IN AN ARRAY 




		//This displays like the count of characters but it doesn't really add to anything. It should probably be deleted.
		var emptyCharacters = upperComputerPick.length;
		console.log(emptyCharacters);
		//console.log('-------------------');



		//check the number of spaces that are in the computer pick so we can match it against the spaces at the end and count it complete
		console.log("where are the spaces " + upperComputerPick.indexOf(" "));
		for (var i = 0; i < upperComputerPick.length; i++) {
			if (upperComputerPick[i] == " ") {
				spaceCounter = spaceCounter + 1;
			}
		};
		console.log("space counter " + spaceCounter);


		for (var i = 0; i < upperComputerPick.length; i++) {
			if (upperComputerPick == " ") {
				countSpaceDisplay = countSpaceDisplay + 1;
				console.log("How Many Spaces: " + countSpaceDisplay);
			}
		};


		//Display the hangman game as soon as you define displayWord so it doesn't show up after the first guess


		//Definitely need this userDisplay defines where key text will show up.
		var userDisplay = document.getElementById("user-text");

		//Ok so this is when you press any key on your keyboard
		//TODO: Do you want to restrick it to only alpha numeric keys?
		document.onkeyup = function (event) {


			var userPick = event.key.toUpperCase(); //This is where we define what the user picked and automatically makes it uppercase
			userDisplay.textContent = 'Letter you are guessing:  ' + userPick; // changes what is in the "user-text" span to whatever the user has just picked
			console.log(event.key);
			console.log('-------------------');
			console.log(allPicks); // empty because I havent pushed content to allPicks array yet



			console.log("this is the index location of previous pick versus current user pick: " + allPicks.indexOf(userPick));


			//this checks to see if you've picked this product before
			if (allPicks.indexOf(userPick) > 0) {
				alert("You've already picked this character.");
			}
			else {
				var charSuccess = 0; //charSuccess will count the number of times that letter is in the code and counts it as one round of success.
				//this is important because if charSuccess is greater than zero then its its a successful round, and if it less than zero you didn't match any letters
				totalGuesses = totalGuesses - 1;
				console.log("These are total guesses :" + totalGuesses)
				for (var i = 1; i < upperComputerPick.length; i++) {

					if (userPick == upperComputerPick[i]) {
						charSuccess = charSuccess + 1; //everytime you successfully match a letter in each placement then it counts it. 
						//It needs to reset to zero each guess.
						displayWord[i] = userPick; //set that place in the array to what was guessed.
						charFailArray[i] = null;
						totalCharSuccess = totalCharSuccess + 1;
					}

					else {
						// console.log("this is the array of failed positions:" + charFailArray);
						//charFailArray = charFailArray.filter( function(){i=i});
					}

				}


				console.log("this is how many letters you've just matched successfully:" + charSuccess);
				console.log("all the characters matched successfully:" + totalCharSuccess);
				console.log(displayWord);
				if (charSuccess > 1) {
					message = "Yass Queen, you matched " + charSuccess + " letters!";
				}
				else if (charSuccess > 0) {
					message = "Yass Queen, you matched " + charSuccess + " letter!";
				}
				else {
					message = "Darn Girl, try again.";
					failPicks.push(userPick);
				}

				//if there are only spaces left in the word, show a message that says congratulations and press space bar to restart game.
				// for (var i = 0; i < upperComputerPick.length; i++){

				// 	if displ	
				// }
				console.log("this is the array of failed positions:" + charFailArray);
				function messagePick() {
					document.querySelector("#messagePick").innerHTML = message;
				}

				messagePick();


				//Total Character count - the number of spaces found should equal the number of successful characters found

			}

			console.log("space counter " + spaceCounter);


			allPicks.push(userPick); //push userpick at the end because you don't want it to mess up your index of allPicks to see if you've picked the letter before
			console.log("these are failed picks : " + failPicks);
			index = upperComputerPick.indexOf(userPick);
			console.log("this is the location of the user pick in the secret word:" + index);
			console.log('-------------------');
			repeat = allPicks.indexOf(userPick)
			console.log("this is the location of the user pick in all of the picks you've done before:" + repeat);

			function updateScore() {
				document.querySelector("#badGuess").innerHTML = "Fail Picks: " + failPicks;
			}

			updateScore();

			// KEEPS TRACK OF NUMBER OF WINS
			function Winner() {
				$("#Winner").text('Your wins:  ' + userWins);
			}

			Winner();

			// KEEPS TRACK OF NUMBER OF GUESSES LEFT
			function guessesLeft() {
				$("#remainingGuesses").text('Remaining Guesses: ' + totalGuesses);

			}

			guessesLeft();

			var hangDisplay = document.getElementById("Hangman");
			hangDisplay.innerHTML = "";
			for (var i = 0; i < displayWord.length; i++) {

				var newLetterDiv = document.createElement('div');

				newLetterDiv.innerHTML = displayWord[i];

				hangDisplay.appendChild(newLetterDiv);
			};

			if (totalGuesses < 0) {
				$(".modal-title").text("Hangman");
				$(".modal-text").text("You've ran out of guesses" + computerPick);
				$("#game-modal").modal();
				//alert("Sorry, you've ran out of guesses. The answer was: "+ computerPick);
				clearPick();
			}

			if (emptyCharacters - spaceCounter == totalCharSuccess) {
				$(".modal-title").text("Hangman");
				$(".modal-text").text("You've won!");
				var userId = location.search.split("=") || [0, 1];
				userId = userId[1];
				var link = "/lvl/1?ch=1";
				function redirectLink() {
					if (userId) {
						window.location.href = "/lvl/4?ch=" + userId;
					} else {
						window.location.href = link;
					}
				};
				//redirectLink();

				$(document).on("click", "#continue", redirectLink);
				$("#game-modal").modal();
				//alert("you've won!");
				userWins = userWins + 1;
				console.log("Youve Won " + userWins + " times");
				console.log(emptyCharacters - spaceCounter == totalCharSuccess);
				function successText() {
					$("#successText").text(computerPick);
					//document.querySelector("#successText").innerHTML =  computerPick;
				}

				successText();
				Winner();

			};


		};


	};

	// ANSWERS TO HANGMAN
	StevenUniverseChar = [
		"Rose Quartz",
		"Pearl",
		"Amethyst",
		"Ruby",
		"Sapphire",
		"Peridot",
		"Bismuth",
		"Yellow Diamond",
		"Blue Diamond",
		"Pink Diamond",
		"Hessonite",
		"Aquamarine",
		"Topazes",
		"Peridot",
		"Jasper",
		"Holy Blue Agate",
		"Zircons",
		"Centipeetle Mother",
		"Garnet",
		"Opal",
		"Sugilite",
		"Alexandrite",
		"Rainbow Quartz",
		"Sardonyx",
		"Stevonnie",
		"Smoky Quartz",
		"Malachite",
		"Fluorite",
		"Rhodonite"]

	StevenUniverseImg = [
		"Rose_Quartz_-_With_Weapon.png",
		"Current_Pearl_Request.png",
		"Jfek_New_Gen.png",
		"Ruby_-_Weaponized.png",
		"Dan_Sapphy_ur_Freezies_with_Gem.png",
		"Smol_Peridot_by_Lenhi.png",
		"Bismuth_by_Lenhi.png",
		"That_Will_Be_All_YD_with_Cloak_by_Lenhi.png",
		"SomberDiamond_by_Koo.png",
		"Pink_diamond_mural_transparent.png",
		"Hessonite_Body_Frame.png",
		"AquamarineRibbon_by_Koo.png",
		"Topaz_(fusion).png",
		"Squaridot_GrumpFace_Official.png",
		"JASPRUPTION.png",
		"HollyBluesComing2GetYou.png",
		"Zircons_(Blue_&_Yellow).png",
		"Centipeetle_Mother_Big_PNG.png",
		"GarnetByKmes.png",
		"Opal_Gen_3_by_Lenhi.png",
		"Sugilite_-_Cry_for_Help_with_Flail.png",
		"Alexandrite_New_Regen_by_Lenhi.png",
		"Rainbow_Quartz_by_Lenhi.png",
		"Sardonyx_by_Lenhi.png",
		"Stevonnie_with_Sword_and_Shield_by_Lenhi.png",
		"Smoky_Quartz_2_by_Cocoa.png",
		"Malachite_Lenhi.png",
		"Fluorite_1289.png",
		"RhodoniteKPRF-_by_DisneyBoy16.png"]


	$(document).on("click", "#generatePick", generatePick);

}); //end of document.ready 