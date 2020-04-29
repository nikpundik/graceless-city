import React from 'react';
import '../../styles/common.css';
import '../../styles/home.css';

export default (props) => (
  <div className="home">
    <header>
      <div className="manifest">
        <img onClick={props.play} role="presentation" src="images/gracelesscity.gif" />
        <h1>COPS <small>AND</small> ROBBERS</h1>
      </div>
    </header>
    <div className="body">
      <div className="enter">
        <div>
          <input type="text" placeholder="your name" onChange={props.setName} />
        </div>
        <img role="presentation" src="images/rolls.png" />
        <button onClick={props.play}>ENTER the city</button>
        <img role="presentation" src="images/police.png" />
        <p className="beta">BETA VERSION</p>
      </div>
      <div className="howto">
        <h1>HOW TO PLAY</h1>
        <h3>
          <img role="presentation" src="images/rolls.png" />
          make your move
          <img role="presentation" src="images/police.png" />
        </h3>
        <p>
          Click on the ghost car to move your car of one position in the direction you want.
        </p>
        <h3>
          <img role="presentation" src="images/police.png" />
          catch the robber
          <img role="presentation" src="images/police.png" />
        </h3>
        <p>
          You have a limited numbers of tickets. Every time you move you lose one ticket.
          <br />When you run out of tickets you're placed away from the robber and you can continue the chase.
          <br />If you catch the robber see next <big>&#9786;</big>.
        </p>
        <h3>
          <img role="presentation" src="images/rolls.png" />
          escape from the chasers
          <img role="presentation" src="images/rolls.png" />
        </h3>
        <p>You have unlimited moves and you have to do your best to escape.</p>
        <h3>
          <img role="presentation" src="images/rolls.png" />
          make big money
          <img role="presentation" src="images/cash.png" />
        </h3>
        <p>Drive through the city and rob as much gold as you can.</p>
        <h3>
          <img className="doubt" role="presentation" src="images/mark.png" />
          guess where the robber is
          <img role="presentation" src="images/rolls.png" />
        </h3>
        <p>The robber position is revealed to the chasers once in a while.</p>
      </div>
      <h1>CREDITS</h1>
      <p>
        <span>a project by</span>
        {' '}
        <a href="https://twitter.com/nikpundik" target="_blank">nik</a>
        {' '} & {' '}
        <a href="https://twitter.com/giusfalco" target="_blank">beppe</a>
      </p>
      <p>thanks to <a href="https://www.reddit.com/r/gameideas/comments/5fvtj6/name_for_a_multiplayer_online_game/" target="_blank">Tmadiso1</a> for <i>Cops And Robbers</i></p>
      <p><small>1960 matchbox car icons by <a href="http://bartkowalski.com/" target="_blank">bartkowalski</a></small></p>
      <p><small>map skins by <a href="http://stamen.com/" target="_blank">stamen design</a></small></p>
      <p><small>logo by <a href="https://photofunia.com" target="_blank">photofunia</a></small></p>
    </div>
  </div>
);
