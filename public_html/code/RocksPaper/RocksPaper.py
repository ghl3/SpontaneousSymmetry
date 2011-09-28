#! /usr/bin/python

from random import choice



class RPS:

    def __init__(self):
        self.throws = []
        self.First = True

    def playNext(self):
        if self.First:
            print "Playing Rock by Default"
            print "Suggested Play: R \n"
            self.Suggest = "R"
            self.First = False
        else:
            self.play( self.Suggest )

    def play(self,throw):
        if(throw == "R" or throw == "r"):
            self.throws.append("R")
        elif(throw == "P" or throw == "p"):            
            self.throws.append("P")
        elif(throw == "S" or throw == "s"):            
            self.throws.append("S")
        else:
            print "Bad Input"
            return
        self.printGame()

        matchingPlays = self.guessNext(4)
        if len(matchingPlays) != 0:
            self.findCounter(matchingPlays)
            print "\n"
            return

        matchingPlays = self.guessNext(3)
        if len(matchingPlays) != 0:
            self.findCounter(matchingPlays)
            print "\n"
            return

        matchingPlays = self.guessNext(2)
        if len(matchingPlays) != 0:
            self.findCounter(matchingPlays)
            print "\n"
            return

        print "No Matching Plays.  Random: ",
        self.Suggest = choice(["R","P","S"])
        print self.Suggest

        print "\n"

    def printGame(self):
        print "Throws so far: ",
        print self.throws

    def guessNext(self, length):
        size = len(self.throws)
        if size <= length:
            print "Not enough rounds to guess ",
            print length
            return []
        else:
            last = self.throws[size-length:size]
            print "Last ",
            print length,
            print ": ",
            print last
            matchingPlays = []
            for i in xrange(len(self.throws)-length):
                current = self.throws[i:i+length] 
                if current == last:
                    testThrow = self.throws[i+length]
                    matchingPlays.append(testThrow)

            print "Matching Plays: ",
            print matchingPlays
            return matchingPlays

#            if len(matchingPlays) == 0:
#                print "No Matching Plays.  Random: ",
#                print choice(["R","P","S"])
#            else:
#                print matchingPlays
#                self.findCounter(matchingPlays)

    def findCounter(self,list):
        numR = 0
        numP = 0
        numS = 0

        for i in xrange(len(list)):
            if   list[i] == "R": numR += 1
            elif list[i] == "P": numP += 1
            elif list[i] == "S": numS += 1

        if   numR > numP and numR > numS: 
            Guess = "R"
        elif numP > numS and numP > numR: 
            Guess = "P"
        elif numS > numR and numS > numP: 
            Guess = "S"

        elif numS == numP:                
            print "Suggested Play: ", 
            Guess = choice(["S","P"])
        elif numR == numP:                
            print "Suggested Play: ",
            Guess = choice(["R","P"])
        elif numR == numS:                
            print "Suggested Play: ",
            Guess = choice(["R","S"])

        else:  
            print "No suggested Plays.  Random: ", 
            Guess = choice(["R","P","S"])

        # Guess is what the machine guesses I'll do
        # I then counter with the thing that beats
        # the thing that beats what it thinks I'll do
        # Get it?

        if(Guess == "R"): self.Suggest = "S"
        if(Guess == "P"): self.Suggest = "R"
        if(Guess == "S"): self.Suggest = "P"

        print "Suggested Play:",
        print self.Suggest

#            if testThrow == "R": print "P"
#            elif testThrow == "P": print "S"
#x            elif testThrow == "S": print "R"
