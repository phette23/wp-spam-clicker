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
  names = [ /real estate/i
    , /oakley/i
    , /sunglasses/i
    , /massage/i
    , /mulberry /i
    , /nike/i
    , /nuclear power/i
    , /mortgage/i
    , /calvin klein/i
    , /ugg/i
    , /viagra/i
    , /phentermine/i
    , /outlet/i
    , /cash advance/i
    , /samsung/i
    , /ray ban/i
    , /loans/i
    , /business/i
    , /erectile/i
    , /lasik/i
    , /valium/i
    , /klonopin/i
    , /mitsubishi/i
    , /vicodin/i
    , /adderall/i
    , /percocet/i
    , /cialis/i
    , /xanax/i
    , /ambien/i
    , /levitra/i
    , /longchamp/i
    , /vanessa bruno/i
    , /the glades/i
    , /meridia/i
    , /lorazepam/i
    , /My Homepage/i
    , /Homepage/i
    , /Wellensteyn/i
    , /Hermes/i
    , /vuitton/i
    , /insurance/i
    , /moncler/i
    , /suresh/i
    , /coupon/i
    , /URL/
    , /fiverr/i
    , /buy gig/i
    // a lot of spam comments use a URL for name
    , /^( https?:)/i
    , /cheapest/i ];
  sites = [ /idealglasses\.net/
    , /gruppomelearn\.net/
    , /youtube\.com\/watch\?v/
    , /hollycalvinklein\.com/
    , /digital\-import\.co\.uk/
    , /small\-business\-online\.co\.uk/
    , /ieeesfsu\.org\.pl/
    , /iphone2madness\.com/
    , /paada\.co\.uk/
    , /abcads\.net/
    , /clubtickets\.ws/
    , /eziconex\.com/
    , /vbro\.co\.uk/
    , /islamick12\.com/
    , /removedrmfast\.com/
    , /mariopireddu\.net/
    , /hopegfx\.com/
    , /proxykat\.net/
    , /billsmithinc\.com/
    , /goo\.gl/
    , /globalpublicationsandsoftware.com/ ];
  // emails = [ ];
  // ips = [ ];

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
