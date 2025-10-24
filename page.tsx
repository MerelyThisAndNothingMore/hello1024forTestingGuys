'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/aily/Card";
import { Button } from "@/components/aily/Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/aily/Dialog";
import { Textarea } from "@/components/aily/Textarea";

export default function TestersDayPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [testInput, setTestInput] = useState('assert(节日快乐 === true);');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // 粒子背景效果 - 绿色主题
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        angle: Math.random() * Math.PI * 2,
        color: `hsl(${Math.random() * 60 + 100}, 70%, 60%)` // 绿色系
      });
    }
    
    // 绘制粒子
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // 更新位置
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        
        // 边界检查
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
      });
      
      requestAnimationFrame(draw);
    };
    
    draw();
    
    // 窗口大小变化时重置
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 处理测试用例提交
  const handleTestSubmit = () => {
    if (testInput.includes('节日快乐') || testInput.includes('happy')) {
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-900 to-green-900 text-white">
      {/* 粒子背景 */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full opacity-30"
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* 标题 */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-400">
            测试工程师节日祝福
          </h1>
          <p className="text-xl text-emerald-200">致所有保障产品质量的质量守护者</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 节日卡片 */}
          <Card className="bg-emerald-900/50 backdrop-blur-sm border-emerald-700/30">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-500 p-3 rounded-full mr-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h2 className="text-2xl font-semibold">特别致敬</h2>
              </div>
              
              <p className="mb-6 text-emerald-100 leading-relaxed">
                在这个特别的日子，向所有默默守护产品质量的测试工程师致敬！
                愿你们的测试用例覆盖全面，bug无处遁形；
                愿你们的回归测试顺利通过，上线发布平安无事。
              </p>
              
              <div className="flex flex-wrap gap-2">
                {['✅', '🔍', '🛡️', '📊', '📝', '🚀'].map((emoji, i) => (
                  <span 
                    key={i}
                    className="text-2xl animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </Card>
          
          {/* 互动测试用例 */}
          <Card className="bg-green-900/50 backdrop-blur-sm border-emerald-700/30">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 p-3 rounded-full mr-4">
                  <span className="text-2xl">💌</span>
                </div>
                <h2 className="text-2xl font-semibold">发送祝福</h2>
              </div>
              
              <p className="mb-4 text-green-100">
                编写你的祝福测试用例，给测试同学一个惊喜！
              </p>
              
              <div className="mb-4 bg-gray-900 rounded-md p-4 font-mono text-sm">
                <Textarea
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  className="w-full bg-gray-900 text-green-400 border-none focus:ring-0"
                  rows={5}
                  placeholder="输入你的祝福测试用例..."
                />
              </div>
              
              <Button 
                onClick={handleTestSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
              >
                执行祝福测试
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      {/* 祝福弹窗 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-emerald-800 to-green-900 border-emerald-600/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">✅ 祝福测试通过！</DialogTitle>
            <DialogDescription className="text-emerald-200">
              你的测试同学已经收到你的祝福
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-xl mb-4">祝所有测试工程师：</p>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-300">
              Bug无处藏身，上线平安无事！
            </p>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setIsDialogOpen(false)}
              className="bg-gradient-to-r from-emerald-500 to-green-500"
            >
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}