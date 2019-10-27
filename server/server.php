<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

// localhost
/*$dbConfig = [
  'host' => 'localhost',
  'name' => '3156835_app',
  'user' => 'root',
  'pass' => '',
];*/
// google cloud
$dbConfig = [
  'host' => 'mysql:unix_socket=/cloudsql/auauhelp1:us-central1:auauhelp',//'35.238.179.54',
  'appHost' => 'mysql:unix_socket=/cloudsql/auauhelp1:us-central1:auauhelp;dbname=app',
  'name' => 'app',//'auauhelp1:us-central1:auauhelp',
  'user' => 'root',
  'pass' => 'au23@help89',
];

class Loja {
  public $id;
  public $nome;
  public $imagem;
  public $destaque;
};

class Empresa {
  public $id;
  public $nome;
  public $imagem;
  public $destaque;
};

class Mural {
  public $id;
  public $update_at;
  public $content;
}

// helpers
include('./helpers.php');

rc_headers();
if ($_SERVER['REQUEST_METHOD']=='OPTIONS') {
  //rc_headers();
  die();
}

//
// MAIN
//

// prepare output

// variables
$db = null;

try {
  //$db = new PDO('mysql:host='.$dbConfig['host'].';dbname='.$dbConfig['name'].';charset=utf8', $dbConfig['user'], $dbConfig['pass']);
  $db = new PDO($dbConfig['appHost'].';charset=utf8', $dbConfig['user'], $dbConfig['pass']);
} catch (PDOException $e) {
  error($e->getMessage());
}

// request
$request = file_get_contents('php://input');
if (!empty($request)) $request=(object)json_decode($request); else $request=(object)array();

if (!property_exists($request,'action')) $request->action = 'help';

switch ($request->action) {
  case 'getLojas':
    $st = $db->prepare('SELECT id,nome,imagem,destaque,contato,cupom,vendas,(SELECT md.content FROM medias md LEFT JOIN medias_refs mrf ON mrf.id_media=md.id WHERE mrf.id_loja=l.id ORDER BY md.id DESC LIMIT 1) AS content from lojas l');
    $st->setFetchMode(PDO::FETCH_CLASS, 'Loja');
    $st->execute();
    $res = (array) $st->fetchAll();
    $st->closeCursor();
    echo json_encode((object)array('data'=>$res),JSON_PRETTY_PRINT);
    break;

  case 'getEmpresas':
    $st = $db->prepare('SELECT id,nome,imagem,destaque,(SELECT md.content FROM medias md LEFT JOIN medias_refs mrf ON mrf.id_media=md.id WHERE mrf.id_empresa=e.id ORDER BY md.id DESC LIMIT 1) AS content from empresas e ORDER BY destaque DESC');
    $st->setFetchMode(PDO::FETCH_CLASS, 'Empresa');
    $st->execute();
    $res = (array) $st->fetchAll();
    $st->closeCursor();
    echo json_encode((object)array('data'=>$res),JSON_PRETTY_PRINT);
    break;

  case 'addMedia':
    // get content
    list($mime,$content) = explode(',',$request->data);
    $fileType = preg_replace("/(.*\/)(\w+)(\;.*)/","$2",$mime);
    $file = $UPLOADS.str_replace(' ','_',strval(microtime())) . '.' . $fileType;
    //$ifp = fopen( $PATH.$file, 'wb' );
    //fwrite( $ifp, base64_decode( $content ) );
    //fclose( $ifp );
    $st = $db->prepare('INSERT INTO medias (path,type,content) VALUES(:path,:type,:data);', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    if ($st->execute(array(':path'=>$file, ':type'=>0,':data'=>$request->data))) {
      $st->closeCursor();
      $id = $db->lastInsertId();
      $st2 = $db->prepare('INSERT INTO medias_refs (id_loja,id_empresa,id_media) VALUES(:loja,:empresa,:media);', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
      $st2->execute(array(
        ':loja'=> property_exists($request,'idLoja') ? $request->idLoja : null,
        ':empresa'=> property_exists($request,'idEmpresa') ? $request->idEmpresa : null,
        ':media'=>$id));
      $st2->closeCursor();
      if(property_exists($request,'idLoja')) {
        $st3 = $db->prepare('UPDATE lojas SET imagem=:imagem WHERE id=:id', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $st3->execute(array(':imagem'=>$file,':id'=>$request->idLoja));
        $st3->closeCursor();
      } else {
        $st3 = $db->prepare('UPDATE empresas SET imagem=:imagem WHERE id=:id', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $st3->execute(array(':imagem'=>$file,':id'=>$request->idEmpresa));
        $st3->closeCursor();
      }
      die('{"id":'.$id.'}');
    }

    break;

  case 'addEmpresa':
    $st = $db->prepare('INSERT INTO empresas (nome) VALUES(:nome);', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    if ($st->execute(array(':nome'=>$request->nome))) {
      $st->closeCursor();
      $id = $db->lastInsertId();
      die('{"id":'.$id.'}');
    }
    break;
  case 'updateEmpresa':
    $st = $db->prepare('UPDATE empresas SET nome=:nome, imagem=:imagem, destaque=:destaque WHERE id=:id;', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    if ($st->execute(array(':nome'=>$request->nome, ':imagem'=>$request->imagem, ':destaque'=>$request->destaque, ':id'=>$request->id))) {
      $st->closeCursor();
      die('{"status":"ok"}');
    }
    break;

  case 'addLoja':
    $st = $db->prepare('INSERT INTO lojas (nome,contato,cupom) VALUES(:nome,:contato,:cupom);', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    if ($st->execute(array(':nome'=>$request->nome,':contato'=>$request->contato,':cupom'=>$request->cupom))) {
      $st->closeCursor();
      $id = $db->lastInsertId();
      die('{"id":'.$id.'}');
    }
    break;
  case 'updateLoja':
    $st = $db->prepare('UPDATE lojas SET nome=:nome, imagem=:imagem, destaque=:destaque,contato=:contato,cupom=:cupom,vendas=:vendas WHERE id=:id;', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    if ($st->execute(array(':nome'=>$request->nome, ':imagem'=>$request->imagem, ':destaque'=>$request->destaque, ':contato'=>$request->contato, ':cupom'=>$request->cupom, ':vendas'=>$request->vendas, ':id'=>$request->id))) {
      $st->closeCursor();
      die('{"status":"ok"}');
    }
    break;

  case 'addVenda':
    $st = $db->prepare('SELECT * from lojas WHERE id=:id LIMIT 1;');
    $st->setFetchMode(PDO::FETCH_CLASS, 'Loja');
    $st->execute(array(':id'=>$request->id));
    $res = $st->fetch();
    $st->closeCursor();
    $res->vendas = intval($res->vendas) + 1;
    $st = $db->prepare('UPDATE lojas SET vendas=:vendas WHERE id=:id;', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    if ($st->execute(array(':vendas'=>$res->vendas, ':id'=>$request->id))) {
      $st->closeCursor();
      die('{"status":"ok"}');
    }
    break;

  case 'deleteLoja':
    $st = $db->prepare('DELETE FROM lojas WHERE id=:id;', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    if ($st->execute(array(':id'=>$request->id))) {
      $st->closeCursor();
      die('{"status":"ok"}');
    }
    break;

  case 'deleteEmpresa':
    $st = $db->prepare('DELETE FROM empresas WHERE id=:id;', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    if ($st->execute(array(':id'=>$request->id))) {
      $st->closeCursor();
      die('{"status":"ok"}');
    }
    break;

  case 'getCampanha':
    $st = $db->prepare('SELECT content FROM campanha ORDER BY id DESC LIMIT 1');
    $st->setFetchMode(PDO::FETCH_CLASS, 'Mural');
    if ($st->execute()) {
      $res = $st->fetch();
      $st->closeCursor();
      echo json_encode((object)array('data'=>$res->content),JSON_PRETTY_PRINT);
    }
    break;

  case 'updateCampanha':
    $st = $db->prepare('INSERT INTO campanha SET content=:content;', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    if ($st->execute(array(':content'=>$request->data))) {
      $st->closeCursor();
      die('{"status":"ok"}');
    }
    break;

  case 'getPontoDeVenda':
    $st = $db->prepare('SELECT content FROM pdv ORDER BY id DESC LIMIT 1');
    $st->setFetchMode(PDO::FETCH_CLASS, 'Mural');
    if ($st->execute()) {
      $res = $st->fetch();
      $st->closeCursor();
      echo json_encode((object)array('data'=>$res->content),JSON_PRETTY_PRINT);
    }
    break;

  case 'updatePontoDeVenda':
    $st = $db->prepare('INSERT INTO pdv SET content=:content;', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    if ($st->execute(array(':content'=>$request->data))) {
      $st->closeCursor();
      die('{"status":"ok"}');
    }
    break;

  case 'getOAB':
    $st = $db->prepare('SELECT content FROM oab ORDER BY id DESC LIMIT 1');
    $st->setFetchMode(PDO::FETCH_CLASS, 'Mural');
    if ($st->execute()) {
      $res = $st->fetch();
      $st->closeCursor();
      echo json_encode((object)array('data'=>$res->content),JSON_PRETTY_PRINT);
    }
    break;

  case 'updateOAB':
    $st = $db->prepare('INSERT INTO oab SET content=:content;', array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    if ($st->execute(array(':content'=>$request->data))) {
      $st->closeCursor();
      die('{"status":"ok"}');
    }
    break;


  default:
    die('{"request_ip":"'.get_ip_address().'"}');
    break;
}


die();
//echo '<pre>';
$res = array();

//while ($row = $st->fetch(PDO::FETCH_LAZY,PDO::FETCH_ORI_NEXT)) {
//while ($row = $st->fetchObject()) {
//while ($row = $st->fetch()) {
//  print_r($row->nome);
//  array_push($res, $row->nome);
//}
$res = (array) $st->fetchAll();
$st->closeCursor();
//echo $res[1]->getCoisa();
echo json_encode((object)array('data'=>$res),JSON_PRETTY_PRINT);
