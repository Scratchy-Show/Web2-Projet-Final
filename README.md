# Web2-Projet-Final
- Projet : Chat
- Programmeur : Couret Alexandre

---
---

## Page index
Les animations présentes dans la page index pour Marco :
- MarcoWakeUp
- MarcoBreathe
- MarcoKillForward
- MarcoZombie
- MarcoZombieWaiting

Les animations présentes dans la page index pour Soldier :
- SoldierRun
- SoldierSlowMotion
- SoldierWaiting
- SoldierFear
- SoldierFlees

L'animation présente dans la page index pour Flying :
- Chicken

### Evènement souris
- **onclick**

### Résumé
Marco se réveille (MarcoWakeUp), puis il respire (MarcoBreathe). En cliquant dessus, il meurt (MarcoKillForward) mais revient en zombie (MarcoZombie) et attend (MarcoZombieWaiting).

Pendant ce temps, des soldats arrivent en courant (SoldierRun) aléatoirement de gauche ou de droite. À une certaine distance de Marco, ils ralentissent (SoldierSlowMotion), attendent (SoldierWaiting) puis prennent peur (SoldierFear) et fuient (SoldierFlees). Une fois sortis de l'écran, ils sont supprimés et réapparaissent en courant de nouveau de gauche ou de droite.

En parallèle, des poulets volent au-dessus à des vitesses différentes. Une fois sortis de l'écran, ils sont supprimés et réapparaissent de nouveau.

---
---

## PAGE REGISTER
Les animations présentes dans la page index pour Marco :
- MarcoBreathe
- MarcoPullBreathe
- MarcoWalk
- MarcoPullWalk
- Bullet

Les animations présentes dans la page index pour le robot Chaingun :
- ChaingunRobotActivating
- ChaingunRobotWaiting
- ChaingunRobotDestroyed

### Evènement souris
- **onmouseover**
- **onclick**

### Résumé
Marco apparaît (MarcoBreathe) avec une animation CSS. Il marche (MarcoWalk) et en même temps, le background se déplace. Au survol de la souris lorsque Marco marche, il tire (MarcoPullWalk). Après un certain temps, un robot apparaît de la droite. Il s'active (ChaingunRobotActivating) et attend (ChaingunRobotWaiting). Dès que Marco le voit, il s'arrête (MarcoBreathe) et le background s'arrête également.

Au clic de la souris sur Marco qui attend, il tire (MarcoPullBreathe) et une balle (Bullet) se déplace jusqu'à toucher le robot. Le robot perd en opacité jusqu'à être totalement transparent et donc détruit (ChaingunRobotDestroyed). Une fois détruit, Marco marche de nouveau (MarcoWalk), le background se déplace aussi, ainsi que le robot détruit jusqu'à sortir de l'écran. À ce moment-là, il est supprimé, et un nouveau robot apparaît de la droite (ChaingunRobotActivating).

---
---

## PAGE CHAT
**Animations Marco**
- MarcoBreathe
- MarcoSpace
**Animation Flying**
- Chicken
**Animation UEFO**
- UefoFlying
- UefoDestroyed
## Evènements clavier
**keypress**
Quand la touche "p" reste appuyée, des poulets apparaissent. Cela est possible uniquement si SpaceOn=false.
**keydown**
Appuyer sur la barre d'espace change le background, l'animation de Marco et un UefoFlying est attribué pour chaque membre connecté. Cela est possible uniquement si SpaceOn=true.
## Comportements générés
**kill**
Uniquement si SpaceOn=true, la commande "kill" détruit l'UEFO de celui qui envoie la commande.
**killall**
Uniquement si SpaceOn=true, la commande "killall" détruit tous les UEFOs.
---