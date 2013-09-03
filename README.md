Demo: http://lucasbaumgarten.x10.bz/keyboard_nav/

Estrutura básica. Basic structure.

Por favor note que #navContent, precisa ser maior que #scroller. Please note that #navContent must be greater than #scroller.

`<div id="scroller" style="position:relative;overflow:hidden;">
      <div id="navContent"></div>
</div>`
 
 Como usar. How to use:
 
      $('#scroller').keyboard_nav({
      
          btnMouseRightObj: null,//Objeto que ao ser clicado navega para a direita. Object that onclick navigates to right
          
          btnMouseLeftObj: null,//Objeto que ao ser clicado navega para a esquerda. Object that onclick navigates to left
          
          btnMouseUpObj: null,//Objeto que ao ser clicado navega para cima. Object that onclick navigates to up
          
          btnMouseDownObj: null,//Objeto que ao ser clicado navega para baixo. Object that onclick navigates to down
          
          centerPageAt: null, //Objeto onde deve ser centralizada a página. Object that is centered on the page load.
          
          spollInterval: 50,//tempo para rodar o interval do efeito de rolagem. Interval time for the scroll effect
          
          spollPercent: .05//Porcentagem do tamanho da tela que deve scrollar cada vez. Percent of screen size for each scroll.
          
          onScrollCallback: function(obj,direction){}//função de callback quando for iniciado um scroll. Callback function for scroll initialize.
      
      });
 
 
 @author ekbaumgarten Lucas Baumgarten
 
 https://github.com/ekbaumgarten/keyboard_nav
 
 http://facebook.com/ekbaumgarten
 
 http://twitter.com/ekbaumgarten
