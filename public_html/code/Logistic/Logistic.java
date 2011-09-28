
import java.applet.*;
import java.awt.*;
import java.awt.event.*;

import java.util.Random;

public class Logistic extends Applet 
  implements ActionListener, MouseListener, MouseMotionListener  
{
    
  public Button refresh;
  private String text;

  // Properties of the Mouse Area:
  private int clickX;
  private int clickY;

  private int mouseX;
  private int mouseY;
  private boolean mouseActive;

  private int rectX,rectY,rectwidth,rectheight;
  private boolean mouseEntered;
  private boolean rectClicked;    

  Dimension dim; 

  Image bufferImage;
  Graphics bufferGraphics; 

  Image textImage;
  Graphics textGraphics;

  Image mapImage;
  Graphics mapGraphics;

  int borderX;
  int borderY;

  Color Transparent;

  public void init() 
  {
    String output = "init(): Initializing Applet";
    System.out.println(output);
    setBackground(Color.white);
	
    // Parameters
    text = "This is the Text";
    text = getParameter("text"); 

    rectClicked = false;

    Transparent = new Color(0,0,0,0);

    dim = getSize(); 
    RefreshBorders();

    // Image Maker
    bufferImage = createImage(dim.width, dim.height); 
    bufferGraphics = bufferImage.getGraphics(); 

    textImage = createImage(dim.width, dim.height); 
    textGraphics = textImage.getGraphics(); 
    textGraphics.setColor(Color.black);

    // Rectangle
    clickX = 0;
    clickY = 0;


    // System.out.println(rectX);
    // System.out.println(rectY);
    // System.out.println(rectwidth);
    // System.out.println(rectheight);

    // Initialize Map
    // LogisticMap = createImage(rectWidth, rectHeight);

    // Initialize the layout manager
    setLayout(new BorderLayout()); 
	
    // Create and add the refresh button
    refresh = new Button("Refresh");
    refresh.setBounds(20,20,50,30);           
    //refresh.setBounds( new Rectangle(20, 20, 40, 30) ); 
    add(refresh,"South"); // use layout manager 
    //    add(refresh);  // use layout manager 
    refresh.addActionListener(this); 

    // Add the mouse area
    addMouseListener(this); 
    addMouseMotionListener(this); 

    MakeLogisticMap();

  } // init()


  public void paint(Graphics graphic)
  {

    bufferGraphics.clearRect(0, 0, dim.width, dim.width); 
    textGraphics.clearRect(0, 0, dim.width, dim.height);

    
    RefreshBorders();	
    textGraphics.setColor(Color.black);

    // MakeLogisticMap(bufferGraphics);
    // bufferGraphics.drawRect(0, 0, getSize()-1, getSize()-1);
    // bufferGraphics.setColor(Transparent);
    // bufferGraphics.fillRect(rectX,rectY,rectwidth,rectheight);
    // bufferGraphics.drawString(text, 15, 25);

    if(rectClicked) textGraphics.drawString("Clicked Rectangle",20,120); 
    if(mouseActive) textGraphics.drawString( "(" + mouseX + "," + mouseY + ")", mouseX, mouseY);

    graphic.drawImage(bufferImage, 0, 0, this); 
    graphic.drawImage(textImage, rectX, rectY, this);
    graphic.drawImage(mapImage,  rectX, rectY, this);



  }
    
  public void update(Graphics g)
  {
    paint(g);
  }
   

  public void actionPerformed(ActionEvent evt)
  {  
    if(evt.getSource() == refresh)
      {  

	dim = getSize(); 

	RefreshBorders();	
	bufferImage = createImage(dim.width,dim.height); 
	bufferGraphics = bufferImage.getGraphics(); 

	MakeLogisticMap();

	repaint();
	
	// System.out.println(rectX);
	// System.out.println(rectY);
	// System.out.println(rectwidth);
	// System.out.println(rectheight);

      }
  } 

  private void RefreshBorders()
  {
    rectX  = X0(dim, 5); // Border in XX%
    rectY  = Y0(dim, 5); // Border in XX%
    rectwidth   = XWidth(dim, 5);
    rectheight  = YWidth(dim, 5);

  }

  // This method will be called when the mouse has been clicked.
  public void mouseClicked(MouseEvent me) 
  {
    clickX = me.getX();
    clickY = me.getY();

    // Check if the click was inside the rectangle area.
    if (clickX > rectX && clickX < rectX+rectwidth &&
	clickY > rectY && clickY < rectY+rectheight)  
      {
	rectClicked = true;
      }

    // if it was not then rect1Clicked is false;
    else rectClicked = false;

    //show the results of the click
    repaint();
  }

  public void mouseMoved(MouseEvent me)
  {
    mouseX = me.getX();
    mouseY = me.getY();

    // Check if the mouse is in the rectangle
    if (mouseX > rectX && mouseX < rectX + rectwidth && 
	mouseY > rectY && mouseY < rectY + rectheight)
      mouseActive = true;

    else mouseActive = false;
    //show the results of the motion
    repaint();

  }

  public void mouseDragged(MouseEvent me)
  {
  }
  

  // This is called when the mous has been pressed
  public void mousePressed (MouseEvent me) {}

  // When it has been released
  // not that a click also calls these Mouse-Pressed and Released.
  // since they are empty nothing hapens here.
  public void mouseReleased (MouseEvent me) {}

  // This is executed when the mouse enters the applet. it will only
  // be executed again when the mouse has left and then re-entered.
  public void mouseEntered (MouseEvent me) {
    // Will draw the "inside applet message"
    mouseEntered = true;
    repaint();
  }

  // When the Mouse leaves the applet.
  public void mouseExited (MouseEvent me) {
    // will draw the "outside applet message"
    mouseEntered = false;
    repaint();
  }

  

  public void start() {
    String output = "start(): Starting Applet";
    System.out.println(output);
  }

  public void stop() {
    String output = "stop(): Stopping Applet";
    System.out.println(output);
  }

  public void destroy() {
    String output = "destroy(): Destroying Applet";
    System.out.println(output);
  }


  private int X0( Dimension Dim, int border)
  {
    int Width = Dim.width;
    int PosX  = border*Width/100;
    return PosX;
  }

  private int XWidth( Dimension Dim, int border)
  {
    int Width  = Dim.width;
    int WidthX = Width*(100-2*border)/100;
    return WidthX;
  }


  private int Y0( Dimension Dim, int border)
  {
    int Height = Dim.height;
    int PosY   = border*Height/100;
    return PosY;
  }

  private int YWidth( Dimension Dim, int border)
  {
    int Height  = Dim.height;
    int HeightY = Height*(100-2*border)/100;
    return HeightY;
  }


  private void MakeLogisticMap() // Graphics graph)
  {

    System.out.println("Making Logistic Map");

    // Create an image the size of the holder
    // rectangle and get a handle on its graphics
    mapImage = createImage(rectwidth, rectheight);
    mapGraphics = mapImage.getGraphics();

    mapGraphics.setColor(Color.white);
    mapGraphics.fillRect(0,0,rectwidth,rectheight);

    double Min = 2.4;
    double Max = 4.0;

    int intervals  = 100000; // number of points
    int iterations = 100; // iterations per point

    double LogWidth  = (Max - Min);
    double LogStep = LogWidth/intervals;
    double LogHeight = 1.0;

    double Val_old = 0;

    mapGraphics.setColor(Color.red);

    Random generator = new Random();

    for(int i = 1; i < intervals; i++)
      {

	double rate     = Min + i*LogStep;
	double rate_old = Min + (i-1)*LogStep;

	double Val = generator.nextDouble();

	for(int j = 0; j < iterations; j++)
	  {
	    Val = LogisticItr(Val, rate);
	  }

	double X0,X1,Y0,Y1;

	double tmpWidth  = (double) rectwidth;
	double tmpHeight = (double) rectheight;


	X0 = (tmpWidth)*((rate_old - Min)/LogWidth);
	X1 = (tmpWidth)*((rate - Min)/LogWidth);

	Y0 = tmpHeight - (tmpHeight)*(Val_old/LogHeight);
	Y1 = tmpHeight - (tmpHeight)*(Val/LogHeight);

	// System.out.println("Ratio: " + (rate_old - Min)/LogWidth + " , " + (rate - Min)/LogWidth );
	// System.out.println("r: " + rate + "\t Val: " + Val + "  \t|\t  X0: " + X1 + "\t Y1: " + Y1);

	// Draw the Line
	//mapGraphics.drawLine((int)X0, (int)Y0, (int)X1, (int)Y1);
	mapGraphics.drawOval((int)X1, (int)Y1, 1, 1);

	// Update the "cache"
	Val_old = Val;

      }

  }

  private double LogisticItr(double x, double r)
  {
     return r*x*(1-x);
  }


}
