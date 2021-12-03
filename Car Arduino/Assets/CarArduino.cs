using System;
using UnityEngine;
using UnityStandardAssets.CrossPlatformInput;
using System.IO.Ports; //Library to read our arduino data 
using System.Collections;


namespace UnityStandardAssets.Vehicles.Car
{
    
[RequireComponent(typeof(CarController))]
public class CarArduino : MonoBehaviour
{
    private CarController m_Car;

    SerialPort seri = new SerialPort("COM5",9600);

    
    void Awake()
    {
      seri.Open();
      StartCoroutine(ReadDataFromSerialPort());
      m_Car = GetComponent<CarController>();

    }

    IEnumerator ReadDataFromSerialPort(){
      while(true){
        string[] values = seri.ReadLine().Split(',');
        h = (float.Parse(values[0]))/100;
        v = (float.Parse(values[1]))/100;
        print("H:");
        print(h);
        print("V:");
        print(v);
        
        yield return new WaitForSeconds(.05f);
      }
    }

    float h;
    float v;
    
    void FixedUpdate()
    {
      //float h = CrossPlatformInputManager.GetAxis("Horizontal");
#if !MOBILE_INPUT
      float handbrake = CrossPlatformInputManager.GetAxis("Jump");
      m_Car.Move(h,v,v,handbrake);
#else
      m_Car.Move(h,v,v,0f);
#endif
    }
}
}