module.exports = {
    name: 'fuel',
    description: "fuel consumption calculator for road trips (Use no arguments to get help)",
    execute(message, args){
		var msg = "";
		
        if(args.length == 0) {
			// If the user sent us no arguments, presume they want help using this command
			msg = "This is the help section for the fuel calculator.\n";
			msg = "This calculator is used so that you can calculate how much fuel you will use on a road trip\n";
			msg = "The arguments you use with this calculator is as follows:\n";
			msg = "1. The distance between your two locations (Km)\n";
			msg = "2. The fuel consumption of your car (L/100Km)\n";
			msg = "3. The maximum fuel tank capacity of your car (L)\n";
			msg = "4. The number of little fuel lines on your fuel gauge in total\n";
			msg = "5. The number of little fuel lines left in your fuel tank\n";
			msg = "6. A simple little yes/no as to whether or not your trip is also a return trip\n";
			
            message.channel.send(msg);
		} else if (args.length != 6) {
			// If the user sent us the wrong number of arguments, scream at them and threaten their family
			message.channel.send("Thee has\'t hath sent the wrong numb\'r of commandeth arguments");
		} else {
			// If the user sent us all 6 arguments, calculate the output
			float usrDist = parseFloat(args[0]);
			float usrCnsmptn = parseFloat(args[1]);
			float usrFlTtl = parseFloat(args[2]);
			int usrTicks = parseInt(args[3]);
			int usrFlLft = parseInt(args[4]);
			boolean usrReturn = (args[5].toLowerCase() == 'true') || (args[5].toLowerCase() == 'yes') || (args[5].toLowerCase() == '1');
			
			if (usrReturn === true)
				usrDist *= 2;
			
			float usrCnsmptnPerKm = usrCnsmptn / 100;
			float fuelUsageOverTrip = usrDist * usrCnsmptnPerKm;
			
			msg = "You will use " + fuelUsageOverTrip.toString() + " L of fuel\n";
			
			float percFuelLeftStart = Math.round(100 * usrFlLft / usrTicks);
			float fuelInTankStart = percFuelLeftStart * usrFlTtl / 100;
			msg += "At the start of the trip, you will have " + percFuelLeftStart.toString() + " % of your fuel\n";

			float percFuelLeftEnd = Math.round(100 * (fuelInTankStart - fuelUsageOverTrip) / usrFlTtl);
			msg += "At the end of the trip, you will have " + percFuelLeftEnd.toString() + " % of your fuel left\n";

			float ticksLeft = percFuelLeftEnd * usrTicks / 100;
			msg += "This will show up on your fuel gauge as " + ticksLeft.toString() + " lines of fuel left";
			message.channel.send(msg);
		}
    }
}