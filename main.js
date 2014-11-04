/*jshint browser:true, unused:false */
/* global NodeList */
void(
(function ( undefined ){
  'use strict';
  var d = document,
    unsupported = !( d.querySelectorAll && d.querySelector && Array.prototype.forEach && Element.prototype.querySelector && Element.prototype.setAttribute ),
    names = [],
    sites = [],
    emails = [],
    ips = [],
    totalComments = 0,
    actedUpon = 0;

  // shortcuts
  function re ( str ) {
    return new RegExp('\\b' + str + '\\b', 'i');
  }
  function qa ( sel ) {
    return d.querySelectorAll( sel );
  }
  Element.prototype.qs = Element.prototype.querySelector;
  Element.prototype.attr = Element.prototype.setAttribute;

  // browser doesn't have necessary DOM methods
  if ( unsupported ) {
    console.log( 'Sorry, your browser doesn\'t have the needed features to run this script. Try an up-to-date version of Chrome or Firefox.' );
    return;
  }

  // arrays of regexs which comments are tested against
  names = [ /^ Marketing$/
    , /^( https?:)/ // a lot of spam comments use a URL for name
    , /URL/
    , re(' jerseys')
    , re('abercrombie')
    , re('adderall')
    , re('air max')
    , re('ambien')
    , re('beats by dre')
    , re('burberry')
    , re('business')
    , re('buy gig')
    , re('calvin klein')
    , re('canada goose')
    , re('cash advance')
    , re('chanel')
    , re('cheapest')
    , re('cialis')
    , re('coupon')
    , re('dior bag')
    , re('erectile')
    , re('ferragamo')
    , re('fiverr')
    , re('gamma blue')
    , re('hermes')
    , re('homepage')
    , re('insurance')
    , re('jordans?')
    , re('klonopin')
    , re('lasik')
    , re('levitra')
    , re('loans')
    , re('longchamp')
    , re('lorazepam')
    , re('louboutin')
    , re('maillot')
    , re('massage')
    , re('mercurial vapor')
    , re('meridia')
    , re('michael kors')
    , re('mitsubishi')
    , re('moncler')
    , re('mortgage')
    , re('mulberry')
    , re('my homepage')
    , re('new balance')
    , re('nike')
    , re('nuclear power')
    , re('oakley')
    , re('outlet')
    , re('percocet')
    , re('phentermine')
    , re('ray bans?')
    , re('real estate')
    , re('replica watch')
    , re('samsung')
    , re('site test')
    , re('sunglasses')
    , re('suresh')
    , re('test site')
    , re('the glades')
    , re('ugg')
    , re('valium')
    , re('vanessa bruno')
    , re('viagra')
    , re('vicodin')
    , re('vuitton')
    , re('Wellensteyn')
    , re('xanax')
    ];
  sites = [ /abcads\.net/
    , /beefruit\.net/
    , /billsmithinc\.com/
    , /clubtickets\.ws/
    , /digital\-import\.co\.uk/
    , /eziconex\.com/
    , /globalpublicationsandsoftware\.com/
    , /goo\.gl/
    , /gruppomelearn\.net/
    , /hollycalvinklein\.com/
    , /hopegfx\.com/
    , /ieeesfsu\.org\.pl/
    , /indes\.fr/
    , /iphone2madness\.com/
    , /islamick12\.com/
    , /mariopireddu\.net/
    , /mytestsite\.com/
    , /paada\.co\.uk/
    , /proxykat\.net/
    , /removedrmfast\.com/
    , /small\-business\-online\.co\.uk/
    , /vbro\.co\.uk/
    , /youtube\.com\/watch\?v/
    , /idealglasses\.net/
    ];
  // emails = [ ];
  ips = [
    /58\.23\.27\.62/
    ];

  // extend NodeList with Array's forEach method
  NodeList.prototype.forEach = Array.prototype.forEach;

  // check each comment for matches
  totalComments = qa( '#the-comment-list tr' ).length;
  qa( '#the-comment-list tr' ).forEach( function ( val, ind, arr ) {
    var col = val.qs( '.author' ),
      acted = false,
      comment = {
        name: col.qs( 'strong' ) ? col.qs( 'strong' ).textContent : '',
        site: col.qs( ' a[title]' ) ? col.qs( ' a[title]' ).href : '',
        email: col.qs( 'a[href^="mailto"]' ) ? col.qs( 'a[href^="mailto"]' ).href.replace( 'mailto:', '' ) : '',
        ip: col.qs( 'a[href^="edit-comments.php?s="]' ) ? col.qs( 'a[href^="edit-comments.php?s="]' ).textContent : ''
      };

    names.forEach( function ( val2, ind2, arr2 ) {
      if ( comment.name.match( val2 ) ) {
        val.qs( 'input[type="checkbox"]' ).attr( 'checked', 'true' );
        acted = true;
      }
    });

    sites.forEach( function ( val2, ind2, arr2 ) {
      if ( comment.site.match( val2 ) ) {
        val.qs( 'input[type="checkbox"]' ).attr( 'checked', 'true' );
        acted = true;
      }
    });

    emails.forEach( function ( val2, ind2, arr2 ) {
      if ( comment.email.match( val2 ) ) {
        val.qs( 'input[type="checkbox"]' ).attr( 'checked', 'true' );
        acted = true;
      }
    });

    ips.forEach( function ( val2, ind2, arr2 ) {
      if ( comment.ip.match( val2 ) ) {
        val.qs( 'input[type="checkbox"]' ).attr( 'checked', 'true' );
        acted = true;
      }
    });

    if ( acted ) {
      actedUpon += 1;
    }

  });

  console.log( '%d comments selected out of %d', actedUpon, totalComments );
}())
);
