
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
    
    if( a == 0 ):
        print -c/b
        return

    discrim = b*b - 4*a*c

    if( discrim < 0 ):
        Plus = complex( -b/(2*a),    math.sqrt( -discrim) )
        Minus = complex( -b/(2*a), -1*math.sqrt( -discrim) )
        print "(%f + %fi, %f + %fi)" % (Plus.real, Plus.imag, Minus.real, Minus.imag)

    else:
        Plus  = (-b + math.sqrt( b*b - 4*a*c) ) / (2*a)
        Minus = (-b - math.sqrt( b*b - 4*a*c) ) / (2*a)
        print "(%f, %f)" % (Plus, Minus)



    return

    
if __name__ == "__main__":
    main()
