const postcss = require("postcss");
const syntax = require("postcss-less");

const less = `
    // inline comment

    .container {
        .mixin-1();
        .mixin-2;
        .mixin-3 (@width: 100px) {
            width: @width;
        }
    }

    .rotation(@deg:5deg){
      .transform(rotate(@deg));
    }
`;

const result = postcss().process(less, { syntax });

// will contain the value of `less`
const { content } = result;
debugger;
