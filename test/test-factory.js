const { expect } = require("chai");
const { accounts, contract, web3 } = require("@openzeppelin/test-environment");
const { setupLoader } = require("@openzeppelin/contract-loader");
const { privateToAddress, ecsign } = require("ethereumjs-util");

const loader = setupLoader({
  provider: web3,
  artifactsDir: "test/artifacts",
  defaultGas: 5000000,
});
const {
  BN,
  expectEvent,
  expectRevert,
  send,
} = require("@openzeppelin/test-helpers");

// Create a contract object from a compilation artifact
const ERC721Factory = contract.fromArtifact("ERC721Factory");
const ERC721Tradable = contract.fromArtifact("ERC721Tradable");

describe("ERC721Factory", async function () {
  const [owner, user] = accounts;

  beforeEach(async function () {
    this.timeout(10000);
    this.ERC721factory = await ERC721Factory.new({ from: owner });
    this.ERC721Tradable = await ERC721Tradable.new(
      user,
      "name",
      "symbol",
      "https://ERC721Tradable/",
      { from: owner }
    );
  });

  it("Initilize data", async function () {
    expect(await this.ERC721Tradable.name()).to.be.equal("name");
    expect(await this.ERC721Tradable.symbol()).to.be.equal("symbol");
    expect(await this.ERC721Tradable.owner()).to.be.equal(user);
    expect(await this.ERC721Tradable.baseURI()).to.be.equal(
      "https://ERC721Tradable/"
    );
  });

  it("ERC721Tradable: should mint new asset", async function () {
    const tokenID = "12345678910234343434";
    await expectRevert(
      this.ERC721Tradable.mintTo(user, tokenID, {
        from: owner,
      }),
      "revert"
    );
    await this.ERC721Tradable.mintTo(user, tokenID, {
      from: user,
    });

    expect(await this.ERC721Tradable.tokenURI(tokenID)).to.be.equal(
      "https://ERC721Tradable/" + tokenID
    );
  });

  it("ERC721Tradable: should update new metadata uri", async function () {
    const tokenID = "12345678910234343434";
    const newURI = "ipfs://";
    await this.ERC721Tradable.mintTo(user, tokenID, {
      from: user,
    });

    expect(await this.ERC721Tradable.tokenURI(tokenID)).to.be.equal(
      "https://ERC721Tradable/" + tokenID
    );

    await this.ERC721Tradable.setBaseMetadataURI(newURI, {
      from: user,
    });
    expect(await this.ERC721Tradable.tokenURI(tokenID)).to.be.equal(
      newURI + tokenID
    );
  });

  it("ERC721factory: should create new ERC721 token contract", async function () {
    const collectionName = "collection1";

    const res = await this.ERC721factory.createERC721(
      collectionName,
      "baseMetadataUri",
      {
        from: owner,
      }
    );
  });
});
