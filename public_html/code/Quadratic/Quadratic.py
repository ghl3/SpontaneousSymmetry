
import sys
import math

def main():


    # Takes 3 arguments
    # ax^2 + bx +c

    if len(sys.argv) < 3:
        sys.exit('Note enough arguments supplied')
    

    a = float(sys.argv[1])
    b = float(sys.argv[2])
    c = float(sys.argv[3])
    
    if( a == 0 and b == 0 ):
        print "No Solution!"
        return

    if( a == 0 ):
        print "x = %f" % (-c/b)
        return

    discrim = b*b - 4*a*c

    if( discrim < 0 ):
        Plus = complex( -b/(2*a),    math.sqrt( -discrim) )
        Minus = complex( -b/(2*a), -1*math.sqrt( -discrim) )
        print "x = %f + %f <b>i</b>" % (Plus.real, Plus.imag)
        print " <br> or <br>" 
        print "x = %f + %f <b>i</b>" % (Minus.real, Minus.imag)

    else:
        Plus  = (-b + math.sqrt( b*b - 4*a*c) ) / (2*a)
        Minus = (-b - math.sqrt( b*b - 4*a*c) ) / (2*a)
        print "x = %f" % (Plus)
        print "<br> or <br>"
        print "x = %f" % (Minus)

    return

    
if __name__ == "__main__":
    main()
