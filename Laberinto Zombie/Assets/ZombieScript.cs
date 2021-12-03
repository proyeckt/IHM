using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class ZombieScript : MonoBehaviour
{
    public Animator m_Animator;
    public GameObject player;
    public NavMeshAgent myNavMeshAgent;
  
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
      float distance = Vector3.Distance(player.transform.position,transform.position);
      m_Animator.SetFloat("distancia",distance);
      myNavMeshAgent.SetDestination(player.transform.position);
    }
}
