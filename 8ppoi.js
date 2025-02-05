const searchParams = new URL(location).searchParams;
const venderName = searchParams.get("venderName");
if (venderName === null) {
  location.href =
    `?venderName=8ppoi&cartridgeName=InvaderX&cartridgeVersion=1.0.0`;
} else {
  const cartridgeName = searchParams.get("cartridgeName");
  const cartridgeVersion = searchParams.get("cartridgeVersion");
  import(
    `./cartridges/${venderName}/${cartridgeName}/${cartridgeVersion}/Cartridge.js`
  ).then((module) => {
    Console = module.Console;
    module.Console.onLoad(
      document.getElementById("screen"),
      module.Cartridge,
      parseFloat(document.getElementById("fps").value),
    );
  });
}
