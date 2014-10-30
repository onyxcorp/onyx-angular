'use strict';

var dependencies = [ '$log' ],
    FriendFactory = function($log) {

      var FriendFactory = function (id, name, points) {
        this.setId(id);
        this.setName(name);
        this.setPoints(points);
      };

      /**
       * Setters & Getters
       */

      FriendFactory.prototype.setId = function (id) {
        if (id) {
          this._id = id;
        } else {
          $log.error('An ID must be provided');
        }
      };

      FriendFactory.prototype.getId = function () {
        return this._id;
      };

      FriendFactory.prototype.setName = function (name) {
        if (name) {
          this._name = name;
        } else {
          $log.error('A friend must have a name');
        }
      };

      FriendFactory.prototype.getName = function () {
        return this._name;
      };

      FriendFactory.prototype.setPoints = function (points) {
        if (points) {
          this._points = points;
        } else {
          $log.error('A player/friend must have points, even if there is 0');
        }
      };

      FriendFactory.prototype.getPoints = function () {
        return this._points;
      };

      FriendFactory.prototype.getData = function () {
        return {
          id: this.getId(),
          name: this.getName(),
          points: this.getPoints()
        };
      };


      /**
       * Friend properties and methods
       */

      /**
       * Para o jogador aparecerá como um formulário normal, no backend será enviado um e-mail para o jogador
       */
      FriendFactory.prototype.sendMessage = function () {

        $log.log('Mensagem Enviada ao jogador');

      };


      /**
       * Deve fazer uma chamada no backend e atualizar o jogador clicado como favorito ou não, cada vez que esta
       * ação é clicada deve ser feita uma requisição ajax
       */
      FriendFactory.prototype.removeFavoriteFriend = function () {

        $log.log('Amigo removido da lisa principal, foi para a esquecidos');

      };


      /**
       * Função irmã e oposta do método acima
       */
      FriendFactory.prototype.addFavoriteFriend = function () {

        $log.log('Amigo movido da lista de esquecidos para a principal');

      };

      return FriendFactory;
    };

module.exports = dependencies.concat(FriendFactory);
