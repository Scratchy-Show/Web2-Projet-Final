# Web2-Projet-Final
- Projet : Chat
- Programmeur : Couret Alexandre
---
---

## PAGE INDEX
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

## Evènement souris
- **onclick**
Un clic sur MarcoBreathe le tue et le transforme en zombie.
---
---

## PAGE REGISTER
**Animations Marco**
- MarcoBreathe
- MarcoPullBreathe
- MarcoWalk
- MarcoPullWalk
- Bullet
**Animations Chaingun**
- ChaingunRobotActivating
- ChaingunRobotWaiting
- ChaingunRobotDestroyed
## Evènements souris
**onclick**
Un clic sur MarcoBreathe et Marco tire.
**onmouseover**
Au survol de MarcoWalk, Marco tire en marchant.
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